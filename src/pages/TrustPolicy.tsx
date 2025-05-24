
import React from 'react';
import { ShieldCheck, ShieldAlert, Gavel, HelpCircle, FileText } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';

const TrustPolicyPage = () => {
  return (
    <AppLayout title="Trust & Dispute Policy" showBackButton>
      <div className="p-4 pb-20">
        <div className="mb-6 text-center">
          <div className="bg-garage-purple/10 p-3 rounded-full inline-flex mb-4">
            <ShieldCheck className="h-8 w-8 text-garage-purple" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Mr. Mechanic Trust Policy</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            We're committed to ensuring trust, safety and fair resolutions between garages and customers.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Our Commitment</CardTitle>
            <CardDescription>
              How we help protect you during vehicle service
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Mr. Mechanic is dedicated to creating a trusted marketplace for vehicle service and repair. 
              We implement several measures to ensure both customers and garage partners have a safe, 
              transparent, and fair experience.
            </p>

            <div className="grid md:grid-cols-3 gap-4 pt-2">
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 p-3 rounded-full mb-3">
                  <ShieldCheck className="h-6 w-6 text-blue-700" />
                </div>
                <h3 className="font-medium mb-1">Verified Garages</h3>
                <p className="text-sm text-muted-foreground">
                  We vet all garage partners before they join our platform
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <div className="bg-green-100 p-3 rounded-full mb-3">
                  <Gavel className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="font-medium mb-1">Dispute Resolution</h3>
                <p className="text-sm text-muted-foreground">
                  Fair and timely resolution of all customer complaints
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-lg">
                <div className="bg-purple-100 p-3 rounded-full mb-3">
                  <ShieldAlert className="h-6 w-6 text-purple-700" />
                </div>
                <h3 className="font-medium mb-1">Service Protection</h3>
                <p className="text-sm text-muted-foreground">
                  Measures to address serious issues like part theft
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Dispute Resolution Process</CardTitle>
            <CardDescription>
              How we handle complaints between customers and garages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Filing a Complaint</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Customers can report an issue directly from their booking history</li>
                    <li>All complaints must be filed within 7 days of service completion</li>
                    <li>Be as specific as possible and include photos/videos as evidence</li>
                    <li>Critical complaints (e.g., part theft, major fraud) receive priority review</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Investigation & Review</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Mr. Mechanic reviews each complaint thoroughly</li>
                    <li>The garage is notified and given opportunity to respond</li>
                    <li>Critical complaints may result in temporary "Under Investigation" status</li>
                    <li>Response time for resolution depends on the complexity of the issue</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Resolution Outcomes</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Mediated resolution between customer and garage</li>
                    <li>Garage required to rectify issues or provide compensation</li>
                    <li>For serious violations, garages may be temporarily suspended</li>
                    <li>Repeated or severe violations may result in permanent removal</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Internal Part Theft Policy</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p>For claims involving internal part theft, Mr. Mechanic follows a strict protocol:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Customer must provide detailed evidence and photos</li>
                      <li>Garage will provide their documentation of service</li>
                      <li>Third-party inspection may be recommended</li>
                      <li>If fault is established, garage faces serious consequences including suspension</li>
                      <li>Resolution depends heavily on evidence quality and third-party verification</li>
                    </ul>
                    <p className="text-sm italic">
                      Note: While we assist in resolution, complex cases may require additional steps beyond our platform.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-muted-foreground mr-3" />
                <span>Terms of Service</span>
              </div>
              <Button variant="link" className="text-garage-purple">View</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <HelpCircle className="h-5 w-5 text-muted-foreground mr-3" />
                <span>Frequently Asked Questions</span>
              </div>
              <Button variant="link" className="text-garage-purple">View</Button>
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <h3 className="font-medium mb-3">Need additional help?</h3>
              <div className="flex gap-3">
                <Link to="/support" className="flex-1">
                  <Button variant="outline" className="w-full">Contact Support</Button>
                </Link>
                <Link to="/report-issue" className="flex-1">
                  <Button className="w-full bg-garage-purple hover:bg-garage-purple/90">Report an Issue</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default TrustPolicyPage;
