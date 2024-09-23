import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, CloudRain, Mountain, Building, GraduationCap, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react'
import { MapContainer, TileLayer, Polygon, Tooltip, useMap } from 'react-leaflet'
import { LatLngTuple, LatLngExpression } from 'leaflet'
import useEmblaCarousel from 'embla-carousel-react'
import 'leaflet/dist/leaflet.css'

interface Favela {
  name: string;
  coords: LatLngTuple[];
  center: LatLngTuple;
  risk: number;
  details: {
    rainfall: number;
    slope: number;
    soilStability: number;
  };
}

const favelas: Favela[] = [
  { 
    name: "Rocinha", 
    coords: [
      [-22.9889, -43.2484], [-22.9851, -43.2445], [-22.9893, -43.2379], [-22.9935, -43.2418],
      [-22.9912, -43.2456], [-22.9889, -43.2484]
    ],
    center: [-22.9889, -43.2431],
    risk: 75,
    details: {
      rainfall: 80,
      slope: 65,
      soilStability: 40
    }
  },
  { 
    name: "Vidigal", 
    coords: [
      [-22.9955, -43.2495], [-22.9930, -43.2465], [-22.9968, -43.2433], [-22.9990, -43.2463],
      [-22.9972, -43.2479], [-22.9955, -43.2495]
    ],
    center: [-22.9962, -43.2464],
    risk: 60,
    details: {
      rainfall: 70,
      slope: 55,
      soilStability: 50
    }
  },
  { 
    name: "Complexo do Alemão", 
    coords: [
      [-22.8567, -43.2867], [-22.8535, -43.2810], [-22.8584, -43.2761], [-22.8617, -43.2818],
      [-22.8592, -43.2842], [-22.8567, -43.2867]
    ],
    center: [-22.8576, -43.2814],
    risk: 45,
    details: {
      rainfall: 50,
      slope: 40,
      soilStability: 60
    }
  },
  { 
    name: "Maré", 
    coords: [
      [-22.8617, -43.2390], [-22.8550, -43.2345], [-22.8584, -43.2284], [-22.8651, -43.2329],
      [-22.8634, -43.2357], [-22.8617, -43.2390]
    ],
    center: [-22.8600, -43.2337],
    risk: 30,
    details: {
      rainfall: 40,
      slope: 20,
      soilStability: 70
    }
  },
  { 
    name: "Cidade de Deus", 
    coords: [
      [-22.9517, -43.3645], [-22.9484, -43.3606], [-22.9528, -43.3567], [-22.9561, -43.3606],
      [-22.9539, -43.3625], [-22.9517, -43.3645]
    ],
    center: [-22.9522, -43.3606],
    risk: 15,
    details: {
      rainfall: 30,
      slope: 10,
      soilStability: 80
    }
  }
]

interface MapControllerProps {
  center: LatLngTuple;
  zoom: number;
}

function MapController({ center, zoom }: MapControllerProps) {
  const map = useMap()
  map.setView(center, zoom)
  return null
}

export default function MapaDesenho() {
  const [rainfall, setRainfall] = useState(50)
  const [slope, setSlope] = useState(50)
  const [soilType, setSoilType] = useState('clay')
  const [riskLevel, setRiskLevel] = useState<number>(65)
  const [favelaRisks, setFavelaRisks] = useState<Favela[]>(favelas)
  const [mapCenter, setMapCenter] = useState<LatLngTuple>([-22.9068, -43.1729])
  const [mapZoom, setMapZoom] = useState(11)
  const mapRef = useRef<L.Map | null>(null)

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])


  const calculateRisk = () => {
    const rainfallFactor = rainfall / 100
    const slopeFactor = slope / 100
    const soilFactor = soilType === 'clay' ? 0.8 : soilType === 'sand' ? 0.6 : 0.4
    const risk = (rainfallFactor * 0.4 + slopeFactor * 0.4 + soilFactor * 0.2) * 100
    setRiskLevel(Math.round(risk))

    const newFavelaRisks = favelas.map(favela => ({
      ...favela,
      risk: Math.random() * 100,
      details: {
        rainfall: Math.round(Math.random() * 100),
        slope: Math.round(Math.random() * 90),
        soilStability: Math.round(Math.random() * 100)
      }
    }))
    setFavelaRisks(newFavelaRisks)
  }


  useEffect(() => {
    const resizeMap = () => {
      window.dispatchEvent(new Event('resize'))
    }
    resizeMap()
    window.addEventListener('resize', resizeMap)
    return () => window.removeEventListener('resize', resizeMap)
  }, [])

  const getRiskColor = (risk: number): string => {
    const intensity = Math.floor(255 * (1 - risk / 100))
    return `rgb(${intensity}, ${intensity}, ${intensity})`
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigateToFavela = (center: LatLngTuple, _name: string) => {
    setMapCenter(center)
    setMapZoom(15)
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="bg-black text-white shadow-md">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold">LandGuard AI</h1>
          <p className="text-gray-300">Intelligent Landslide Prevention</p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Images of favelas with landslides</h2>
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {[
                  { src: '/images/deslizamento favela.jpg', title: '', description: <h3>Source: <a target="_blank" href="https://edition.cnn.com/2022/02/17/americas/brazil-landslides-thursday-intl/index.html">CNN</a></h3> },
                  { src: '/images/deslizamento2.jpeg', title: '', description: <h3>Source: <a target="_blank" href="https://www.brasildefato.com.br/2022/11/28/rio-tem-77-pontos-com-alto-risco-de-deslizamento-aponta-relatorio-do-tcm">Brasil de fato</a></h3> },
                  { src: '/images/deslizamento.jpg', title: '', description: <h3>Source: <a target="_blank" href="https://rioonwatch.org.br/?p=43137">Rio on watch</a></h3> },
                  { src: '/images/rocinha.jpg', title: '', description: <h3>Source: <a target="_blank" href="https://www.iied.org/favela-rocinha-decades-struggle-have-led-rich-political-cultural-landscape">IIED</a></h3> }
                ].map((project, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 relative">
                  <img 
                    src={project.src} 
                    alt={project.title}
                    className="w-full h-[400px] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  </div>
                ))}
              </div>
            </div>
            <Button 
              onClick={scrollPrev} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-2"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button 
              onClick={scrollNext} 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-2"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle><AlertTriangle className="inline-block mr-2" />For Individuals</CardTitle>
              </CardHeader>
              <CardContent>
                Real-time monitoring and early warning system for residents in high-risk areas.
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle><Building className="inline-block mr-2" />For Businesses</CardTitle>
              </CardHeader>
              <CardContent>
                Advanced risk analysis tools for construction and development projects.
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle><CheckCircle className="inline-block mr-2" />For Government</CardTitle>
              </CardHeader>
              <CardContent>
                Comprehensive mapping and disaster prevention policy implementation tools.
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle><GraduationCap className="inline-block mr-2" />For Researchers</CardTitle>
              </CardHeader>
              <CardContent>
                Platform for academic research, historical data analysis, and predictive modeling.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Landslide Risk Assessment Tool</h2>
          <Card className="bg-white border border-gray-200">
            <CardContent className="space-y-4 pt-8">
              <div>
                <label htmlFor="rainfall" className="block text-sm font-medium text-gray-700">
                  <CloudRain className="inline-block mr-2" />Expected Rainfall (mm)
                </label>
                <Slider
                  id="rainfall"
                  min={0}
                  max={100}
                  step={1}
                  value={[rainfall]}
                  onValueChange={(value) => setRainfall(value[0])}
                  className="mt-1"
                />
                <span className="text-sm text-gray-500">{rainfall} mm</span>
              </div>
              <div>
                <label htmlFor="slope" className="block text-sm font-medium text-gray-700">
                  <Mountain className="inline-block mr-2" />Terrain Slope (degrees)
                </label>
                <Slider
                  id="slope"
                  min={0}
                  max={100}
                  step={1}
                  value={[slope]}
                  onValueChange={(value) => setSlope(value[0])}
                  className="mt-1"
                />
                <span className="text-sm text-gray-500">{slope}°</span>
              </div>
              <div>
                <label htmlFor="soilType" className="block text-sm font-medium text-gray-700">Soil Type</label>
                <div id="soilType" className="mt-1 border-gray-300">
                <Select
                  value={soilType}
                  onValueChange={setSoilType}
                >
                  <option value="clay">Clay</option>
                  <option value="sand">Sand</option>
                  <option value="rock">Rock</option>
                </Select>
                </div>
              </div>
              <Button onClick={calculateRisk}>Calculate Risk</Button>
              <div className={`mt-4 p-4 rounded-md bg-gray-100`}>
                <p className="font-semibold">Overall Risk Level: {riskLevel}%</p>
                <p>
                  {
                  riskLevel < 30 ? 'Low risk. Continue to monitor conditions.' :
                  riskLevel < 70 ? 'Moderate risk. Be prepared for potential evacuation.' :
                  'High risk. Consider immediate evacuation if conditions worsen.'
                }
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Risk Map Visualization for Rio de Janeiro Favelas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {favelas.map((favela) => (
              <Button 
                key={favela.name} 
                onClick={() => navigateToFavela(favela.center, favela.name)}
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                {favela.name}
              </Button>
            ))}
          </div>
          <Card className="bg-white border border-gray-200">
            <CardContent>
              <div style={{ height: '600px', width: '100%' }}>
                <MapContainer 
                  center={mapCenter} 
                  zoom={mapZoom} 
                  style={{ height: '100%', width: '100%' }}
                  ref={mapRef}
                >
                  <MapController center={mapCenter} zoom={mapZoom} />
                  <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                  />
                  {favelaRisks.map((favela, index) => (
                    <Polygon
                      key={index}
                      positions={favela.coords as LatLngExpression[]}
                      pathOptions={{ 
                        color: getRiskColor(favela.risk), 
                        weight: 2, 
                        fillOpacity: 0.5 
                      }}
                    >
                      <Tooltip direction="center" permanent>
                        <div>
                          <strong>{favela.name}</strong><br />
                          Risk: {Math.round(favela.risk)}%<br />
                          Rainfall: {favela.details.rainfall}mm<br />
                          Slope: {favela.details.slope}°<br />
                          Soil Stability: {favela.details.soilStability}%
                        </div>
                      </Tooltip>
                    </Polygon>
                  ))}
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <Card className="bg-white border border-gray-200">
            <CardContent>
              <p className="my-4">
                LandGuard AI uses a sophisticated algorithm to calculate landslide risk based on several key factors:
              </p>
              <ul className="list-disc list-inside mb-4">
                <li><strong>Rainfall:</strong> Higher rainfall increases the risk of landslides. We use real-time and forecasted precipitation data.</li>
                <li><strong>Terrain Slope:</strong> Steeper slopes are more susceptible to landslides. We analyze high-resolution topographic data.</li>
                <li><strong>Soil Type:</strong> Different soil types have varying stability. We incorporate geological survey data into our model.</li>
                <li><strong>Historical Data:</strong> We analyze past landslide events to improve our predictive model.</li>
                <li><strong>Vegetation Cover:</strong> Areas with less vegetation are often at higher risk. We use satellite imagery to assess vegetation density.</li>
              </ul>
              <p className="mb-4">
                Our AI model combines these factors, weighing each based on its importance and local conditions. The result is a comprehensive risk assessment that helps communities, businesses, and governments make informed decisions about land use and disaster preparedness.
              </p>
              <p>
                We continuously refine our model using machine learning techniques, incorporating new data and feedback from field experts to improve accuracy and reliability.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <Tabs defaultValue="leadership" className="w-full">
            <TabsList className="bg-gray-200">
              <TabsTrigger value="leadership" className="data-[state=active]:bg-black data-[state=active]:text-white">Leadership</TabsTrigger>
              <TabsTrigger value="technical" className="data-[state=active]:bg-black data-[state=active]:text-white">Technical & Research</TabsTrigger>
            </TabsList>
            <TabsContent value="leadership">
              <Card className="bg-white border border-gray-200">
                <CardContent>
                  <ul className="space-y-4 mt-4">
                    <li>
                      <h3 className="text-lg font-semibold">Wendy Kayore</h3>
                      <p>CEO & Mechanical Engineer</p>
                    </li>
                    <li>
                      <h3 className="text-lg font-semibold"><a href="" target="_blank"></a>Victor Hugo</h3>
                      <p>CTO & Software Engineer</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="technical">
              <Card className="bg-white border border-gray-200">
                <CardContent>
                  <ul className="space-y-4 mt-4">
                    <li>
                      <h3 className="text-lg font-semibold">Junior</h3>
                      <p>AI Engineer & Researcher</p>
                    </li>
                    <li>
                      <h3 className="text-lg font-semibold">Matheus</h3>
                      <p>AI and Machine Learning Specialist</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section> */}

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <Card className="bg-white border border-gray-200">
            <CardContent>
              <div className="space-y-4 mt-4">
                <div className="flex items-center">
                <a href="mailto:contatovhs4@gmail.com" className="flex">
                  <Mail className="mr-2" />
                  contatovhs4@gmail.com
                  </a>
                </div>
                <div className="flex items-center">
                  <a href="tel:+557193101144" className="flex">
                  <Phone className="mr-2" />
                  <p>+55 71 9310-1144</p>
                  </a>
                </div>
                <p>
                  For inquiries about our services, partnerships, or media requests, please don't hesitate to reach out. Our team is committed to providing prompt and helpful responses.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="bg-black text-white mt-8">
        <div className="container mx-auto px-6 py-4 text-center">
          <p>&copy; 2024 LandGuard AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}