
import { useState } from "react";
import { Settings, Save, Mail, Bell, Key, User, Shield } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { auth, db } from "@/lib/firebase";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [saving, setSaving] = useState(false);
  
  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    fullName: "Admin User",
    email: auth.currentUser?.email || "",
  });
  
  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    newSubmission: true,
    securityAlerts: true,
    marketingEmails: false,
  });
  
  // Display preferences
  const [displaySettings, setDisplaySettings] = useState({
    theme: "system",
    tableRows: "10",
  });

  const handleSaveAccountSettings = async () => {
    setSaving(true);
    
    try {
      // In a real app, update profile info in Firestore/Auth
      toast({
        title: "Account updated",
        description: "Your account information has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error updating account",
        description: "Could not update your account information.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSecuritySettings = async () => {
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      });
      return;
    }

    if (securitySettings.newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    
    try {
      const user = auth.currentUser;
      if (!user || !user.email) throw new Error("User not authenticated");

      // Reauthenticate
      const credential = EmailAuthProvider.credential(
        user.email,
        securitySettings.currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      
      // Update password
      await updatePassword(user, securitySettings.newPassword);
      
      // Reset form
      setSecuritySettings({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      });
    } catch (error) {
      console.error("Error updating password:", error);
      toast({
        title: "Error updating password",
        description: "Please check your current password and try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotificationSettings = async () => {
    setSaving(true);
    
    try {
      // In a real app, save to user preferences in Firestore
      const userPrefsRef = doc(db, "adminPreferences", auth.currentUser?.uid || "default");
      await updateDoc(userPrefsRef, {
        notifications: notificationSettings
      });
      
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      });
    } catch (error) {
      console.error("Error saving notification settings:", error);
      toast({
        title: "Error saving settings",
        description: "Could not save your notification preferences.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDisplaySettings = async () => {
    setSaving(true);
    
    try {
      // In a real app, save to user preferences in Firestore
      const userPrefsRef = doc(db, "adminPreferences", auth.currentUser?.uid || "default");
      await updateDoc(userPrefsRef, {
        display: displaySettings
      });
      
      toast({
        title: "Display settings updated",
        description: "Your display preferences have been saved.",
      });
    } catch (error) {
      console.error("Error saving display settings:", error);
      toast({
        title: "Error saving settings",
        description: "Could not save your display preferences.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout 
      title="Settings" 
      subtitle="Manage your account and preferences"
      icon={<Settings className="h-7 w-7 text-sciscribe-gold" />}
    >
      <div className="max-w-4xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-900 border border-slate-800">
            <TabsTrigger value="account" className="data-[state=active]:bg-sciscribe-gold/90 data-[state=active]:text-black">
              <User className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-sciscribe-gold/90 data-[state=active]:text-black">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-sciscribe-gold/90 data-[state=active]:text-black">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="display" className="data-[state=active]:bg-sciscribe-gold/90 data-[state=active]:text-black">
              <Settings className="h-4 w-4 mr-2" />
              Display
            </TabsTrigger>
          </TabsList>
          
          {/* Account Settings */}
          <TabsContent value="account">
            <Card className="bg-slate-900/60 border border-slate-800">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Account Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={accountSettings.fullName}
                      onChange={e => setAccountSettings({...accountSettings, fullName: e.target.value})}
                      className="bg-slate-800 border-slate-700 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={accountSettings.email}
                      onChange={e => setAccountSettings({...accountSettings, email: e.target.value})}
                      className="bg-slate-800 border-slate-700 mt-1"
                    />
                  </div>
                  <div>
                    <Label>Account Type</Label>
                    <div className="bg-slate-800/60 border border-slate-700 rounded-md px-3 py-2 mt-1 text-sm">
                      Administrator <span className="px-2 py-0.5 ml-2 bg-sciscribe-gold/20 text-sciscribe-gold rounded-full text-xs">Full Access</span>
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <Button 
                      onClick={handleSaveAccountSettings}
                      disabled={saving}
                      className="bg-sciscribe-gold hover:bg-sciscribe-gold/80 text-black"
                    >
                      <Save className="h-4 w-4 mr-2" /> Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* Security Settings */}
          <TabsContent value="security">
            <Card className="bg-slate-900/60 border border-slate-800">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Password Settings</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={securitySettings.currentPassword}
                      onChange={e => setSecuritySettings({...securitySettings, currentPassword: e.target.value})}
                      className="bg-slate-800 border-slate-700 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={securitySettings.newPassword}
                      onChange={e => setSecuritySettings({...securitySettings, newPassword: e.target.value})}
                      className="bg-slate-800 border-slate-700 mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={securitySettings.confirmPassword}
                      onChange={e => setSecuritySettings({...securitySettings, confirmPassword: e.target.value})}
                      className="bg-slate-800 border-slate-700 mt-1"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">Two-Factor Authentication</h4>
                    <div className="bg-slate-800/60 border border-slate-700 rounded-md px-3 py-2 flex items-center justify-between">
                      <div>
                        <p className="text-sm">Enhanced account security</p>
                        <p className="text-xs text-slate-400">Not currently enabled</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-slate-600">
                        <Key className="h-4 w-4 mr-1" /> Setup
                      </Button>
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <Button 
                      onClick={handleSaveSecuritySettings}
                      disabled={saving || !securitySettings.currentPassword || !securitySettings.newPassword || !securitySettings.confirmPassword}
                      className="bg-sciscribe-gold hover:bg-sciscribe-gold/80 text-black"
                    >
                      <Save className="h-4 w-4 mr-2" /> Update Password
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card className="bg-slate-900/60 border border-slate-800">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailAlerts" className="text-base">Email Alerts</Label>
                      <p className="text-sm text-slate-400">Receive alerts via email</p>
                    </div>
                    <Switch 
                      id="emailAlerts" 
                      checked={notificationSettings.emailAlerts}
                      onCheckedChange={checked => setNotificationSettings({...notificationSettings, emailAlerts: checked})} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="newSubmission" className="text-base">New Submissions</Label>
                      <p className="text-sm text-slate-400">Get notified when new form submissions arrive</p>
                    </div>
                    <Switch 
                      id="newSubmission" 
                      checked={notificationSettings.newSubmission}
                      onCheckedChange={checked => setNotificationSettings({...notificationSettings, newSubmission: checked})} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="securityAlerts" className="text-base">Security Alerts</Label>
                      <p className="text-sm text-slate-400">Important account security notifications</p>
                    </div>
                    <Switch 
                      id="securityAlerts" 
                      checked={notificationSettings.securityAlerts}
                      onCheckedChange={checked => setNotificationSettings({...notificationSettings, securityAlerts: checked})} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketingEmails" className="text-base">Marketing Emails</Label>
                      <p className="text-sm text-slate-400">Receive product updates and newsletters</p>
                    </div>
                    <Switch 
                      id="marketingEmails" 
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={checked => setNotificationSettings({...notificationSettings, marketingEmails: checked})} 
                    />
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button 
                      onClick={handleSaveNotificationSettings}
                      disabled={saving}
                      className="bg-sciscribe-gold hover:bg-sciscribe-gold/80 text-black"
                    >
                      <Save className="h-4 w-4 mr-2" /> Save Preferences
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          {/* Display Settings */}
          <TabsContent value="display">
            <Card className="bg-slate-900/60 border border-slate-800">
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Display Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select 
                      value={displaySettings.theme} 
                      onValueChange={value => setDisplaySettings({...displaySettings, theme: value})}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-700 mt-1">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="tableRows">Table Rows</Label>
                    <Select 
                      value={displaySettings.tableRows} 
                      onValueChange={value => setDisplaySettings({...displaySettings, tableRows: value})}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-700 mt-1">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        <SelectItem value="5">5 rows</SelectItem>
                        <SelectItem value="10">10 rows</SelectItem>
                        <SelectItem value="25">25 rows</SelectItem>
                        <SelectItem value="50">50 rows</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button 
                      onClick={handleSaveDisplaySettings}
                      disabled={saving}
                      className="bg-sciscribe-gold hover:bg-sciscribe-gold/80 text-black"
                    >
                      <Save className="h-4 w-4 mr-2" /> Save Preferences
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
