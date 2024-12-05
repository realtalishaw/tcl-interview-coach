"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserSettings } from "./user-settings";
import { PrivacyPolicy } from "./privacy-policy";
import { TermsConditions } from "./terms-conditions";

export function SettingsTabs() {
  return (
    <Tabs defaultValue="account" className="max-w-4xl">
      <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="privacy">Privacy</TabsTrigger>
        <TabsTrigger value="terms">Terms</TabsTrigger>
      </TabsList>

      <TabsContent value="account" className="mt-6">
        <UserSettings />
      </TabsContent>

      <TabsContent value="privacy" className="mt-6">
        <PrivacyPolicy />
      </TabsContent>

      <TabsContent value="terms" className="mt-6">
        <TermsConditions />
      </TabsContent>
    </Tabs>
  );
}