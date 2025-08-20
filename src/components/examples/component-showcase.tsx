import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

const ComponentShowcase = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 font-poppins">
          React Kolkata Component Showcase
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          Explore the powerful components and features available in this Next.js starter template.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <Badge variant="secondary">Next.js 15</Badge>
          <Badge variant="secondary">React 19</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">Tailwind CSS</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card Example */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">UI Components</CardTitle>
            <CardDescription className="text-slate-300">
              Beautiful, accessible components built with Radix UI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-4">
              This template includes a comprehensive set of UI components ready to use.
            </p>
            <Button variant="outline" className="text-white border-slate-500 hover:bg-slate-700">
              Learn More
            </Button>
          </CardContent>
        </Card>

        {/* Dialog Example */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Interactive Elements</CardTitle>
            <CardDescription className="text-slate-300">
              Modals, dialogs, and interactive components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-4">
              Showcase interactive elements like dialogs and modals.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Open Dialog
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Example Dialog</DialogTitle>
                  <DialogDescription className="text-slate-300">
                    This is an example of how dialogs work in this template.
                  </DialogDescription>
                </DialogHeader>
                <div className="p-4">
                  <p className="text-slate-300">
                    You can add any content here. The dialog is fully accessible and responsive.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Feature Cards */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">TypeScript Support</CardTitle>
            <CardDescription className="text-slate-300">
              Full TypeScript support with strict type checking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300">
              Get the benefits of static typing for better development experience.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Tailwind CSS</CardTitle>
            <CardDescription className="text-slate-300">
              Utility-first CSS framework for rapid development
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300">
              Build beautiful interfaces quickly with Tailwind's utility classes.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Testing Ready</CardTitle>
            <CardDescription className="text-slate-300">
              Vitest and Playwright testing configured
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300">
              Unit tests with Vitest and E2E tests with Playwright are ready to use.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Internationalization</CardTitle>
            <CardDescription className="text-slate-300">
              Multi-language support with next-intl
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300">
              Built-in i18n support for creating multilingual applications.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">What You Can Build</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-2">Web Applications</h3>
            <p className="text-slate-300">Build modern, responsive web applications with this solid foundation.</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-2">Landing Pages</h3>
            <p className="text-slate-300">Create beautiful landing pages with built-in components and layouts.</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-2">Admin Dashboards</h3>
            <p className="text-slate-300">Develop admin interfaces with the included UI component library.</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-2">E-commerce Sites</h3>
            <p className="text-slate-300">Build online stores with the robust foundation and components.</p>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-slate-800 p-8 rounded-lg border border-slate-700">
        <h2 className="text-2xl font-bold text-white mb-4">Getting Started</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">1. Development</h3>
            <code className="bg-slate-900 text-green-400 px-3 py-1 rounded text-sm">npm run dev</code>
            <p className="text-slate-300 text-sm mt-1">Start the development server</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">2. Testing</h3>
            <div className="space-x-2">
              <code className="bg-slate-900 text-green-400 px-3 py-1 rounded text-sm">npm run test</code>
              <code className="bg-slate-900 text-green-400 px-3 py-1 rounded text-sm">npm run test:e2e</code>
            </div>
            <p className="text-slate-300 text-sm mt-1">Run unit tests and E2E tests</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">3. Build</h3>
            <code className="bg-slate-900 text-green-400 px-3 py-1 rounded text-sm">npm run build</code>
            <p className="text-slate-300 text-sm mt-1">Build for production</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComponentShowcase