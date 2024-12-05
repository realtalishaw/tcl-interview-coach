import { Card } from "@/components/ui/card";

export function PrivacyPolicy() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Privacy Policy</h2>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-600 mb-4">
          Last updated: March 26, 2024
        </p>

        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-2">Information We Collect</h3>
            <p className="text-gray-600">
              We collect information you provide directly to us, including your name, email address, 
              and video recordings during practice sessions. We also automatically collect certain 
              information about your device and how you interact with our platform.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">How We Use Your Information</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>To provide and improve our interview coaching services</li>
              <li>To analyze your performance and provide personalized feedback</li>
              <li>To communicate with you about your account and updates</li>
              <li>To ensure the security of our platform</li>
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Data Storage and Security</h3>
            <p className="text-gray-600">
              Your practice recordings and personal information are stored securely and encrypted. 
              We implement appropriate technical and organizational measures to protect your data 
              against unauthorized access or disclosure.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Your Rights</h3>
            <p className="text-gray-600">
              You have the right to access, correct, or delete your personal information. You can 
              also request a copy of your data or restrict its processing. Contact us to exercise 
              these rights.
            </p>
          </section>
        </div>
      </div>
    </Card>
  );
}