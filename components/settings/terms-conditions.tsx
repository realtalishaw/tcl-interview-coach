import { Card } from "@/components/ui/card";

export function TermsConditions() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 mb-4">
          Last updated: March 26, 2024
        </p>

        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-2">Acceptance of Terms</h3>
            <p className="text-gray-600">
              By accessing and using TCL Interview, you agree to be bound by these Terms and 
              Conditions. If you disagree with any part of these terms, you may not access our service.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">User Responsibilities</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Use the platform in accordance with applicable laws</li>
              <li>Not share or distribute practice materials without permission</li>
              <li>Respect the intellectual property rights of others</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Service Usage</h3>
            <p className="text-gray-600">
              Our AI-powered interview practice platform is provided "as is." While we strive for 
              accuracy, we make no warranties about the completeness or reliability of our feedback 
              and recommendations.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Content Ownership</h3>
            <p className="text-gray-600">
              You retain rights to your practice recordings and responses. However, you grant us a 
              license to use this content to provide and improve our services, including training 
              our AI models.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Limitation of Liability</h3>
            <p className="text-gray-600">
              We shall not be liable for any indirect, incidental, special, consequential, or 
              punitive damages resulting from your use or inability to use our service.
            </p>
          </section>
        </div>
      </div>
    </Card>
  );
}