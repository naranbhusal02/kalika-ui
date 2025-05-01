import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { GraduationCap, Code, Database, Cpu } from 'lucide-react'

export default function TechnicalEducation() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
  <Image
    src="/program-technical.jpg?height=400&width=1920"
    width={1920}
    height={400}
    alt="Technical Education"
    className="object-center w-full h-screen"
  />
</section>


      {/* Main Content */}
      <main className="w-10/12 mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            {/* <TabsTrigger value="faculty">Faculty</TabsTrigger> */}
            {/* <TabsTrigger value="features">Features</TabsTrigger> */}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Program Overview</CardTitle>
                <CardDescription>Technical Education from Class 9 to 12</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our technical education program is designed to provide students with comprehensive knowledge
                  and practical skills in various technical fields. The program runs from class 9 to 12,
                  covering essential aspects of engineering, programming, and computer science.
                </p>
                
                {/* Program Incharge */}
                <div className="mt-8 flex flex-col items-center space-y-4 rounded-lg bg-muted p-6 lg:flex-row lg:space-x-6 lg:space-y-0">
                  <Image
                    src="/arbind.jpg?height=150&width=150"
                    width={150}
                    height={150}
                    alt="Program Incharge"
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold">Er. Arbind Dubey</h3>
                    <p className="text-muted-foreground">Program Incharge - Technical Education</p>
                    <p className="mt-2">
                      Ph.D. in Computer Science with over 15 years of experience in technical education.
                      Specializes in curriculum development and modern teaching methodologies.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Class 9 */}
                {/* Class 9 */}
                <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Class 9 Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-2">
                    <li>English</li>
                    <li>Nepali</li>
                    <li>Mathematics</li>
                    <li>Science</li>
                    <li>Computer Fundamentals</li>
                    <li>Optional Mathematics</li>
                    <li>Engineering Drawing</li>
                    <li>Electrical Engineering</li>
                    <li>Digital Electronics</li>
                    <li>Webpage Design</li>
                    <li>C Programming</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Class 10 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Class 10 Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-2">
                    <li>English</li>
                    <li>Nepali</li>
                    <li>Mathematics</li>
                    <li>Science</li>
                    <li>Optional Mathematics</li>
                    <li>Electronic Devices and Circuits</li>
                    <li>Microprocessor</li>
                    <li>Object Oriented Programming</li>
                    <li>Database Management System</li>
                    <li>Computer Networks</li>
                    <li>Computer Maintenance</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Class 11 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Class 11 Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-2">
                    <li>English (4 Credits, 128 Hours)</li>
                    <li>Nepali (3 Credits, 96 Hours)</li>
                    <li>Mathematics (3 Credits, 96 Hours)</li>
                    <li>Chemistry (3 Credits, 96 Hours)</li>
                    <li>Physics (3 Credits, 96 Hours)</li>
                    <li>Programming in Java (4 Credits, 128 Hours)</li>
                    <li>Computer Organization & Architecture (4 Credits, 128 Hours)</li>
                    <li>Operating System (4 Credits, 128 Hours)</li>
                    <li>Web & Mobile Application Development (4 Credits, 128 Hours)</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Class 12 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-5 w-5" />
                    Class 12 Courses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-2">
                    <li>English (4 Credits, 128 Hours)</li>
                    <li>Social Studies (3 Credits, 96 Hours)</li>
                    <li>Mathematics (3 Credits, 96 Hours)</li>
                    <li>Chemistry (3 Credits, 96 Hours)</li>
                    <li>Physics (3 Credits, 96 Hours)</li>
                    <li>Visual Programming (4 Credits, 128 Hours)</li>
                    <li>Computer Network (4 Credits, 128 Hours)</li>
                    <li>Contemporary Technology (4 Credits, 128 Hours)</li>
                    <li>Software Engineering and Project (4 Credits, 128 Hours)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Faculty Tab */}
          <TabsContent value="faculty">
            <Card>
              <CardHeader>
                <CardTitle>Our Faculty</CardTitle>
                <CardDescription>Meet our experienced technical education team</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Faculty cards would go here - placeholder for now */}
                <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                  <Image
                    src="/placeholder.svg?height=120&width=120"
                    width={120}
                    height={120}
                    alt="Faculty Member"
                    className="rounded-full"
                  />
                  <div className="text-center">
                    <h3 className="font-semibold">Jane Doe</h3>
                    <p className="text-sm text-muted-foreground">Computer Science</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Course Features</CardTitle>
                <CardDescription>What makes our technical education program special</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="font-semibold">Practical Learning</h3>
                  <p className="text-sm text-muted-foreground">
                    Hands-on experience with latest technology and equipment
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Industry Exposure</h3>
                  <p className="text-sm text-muted-foreground">
                    Regular industry visits and expert sessions
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">Modern Curriculum</h3>
                  <p className="text-sm text-muted-foreground">
                    Updated regularly to match industry standards
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

