"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useSession } from "next-auth/react"
import { Bell, Key, Shield, User, Wallet } from "lucide-react"

export default function SettingsPage() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
      </div>

        <Tabs defaultValue="account" className="space-y-4">
            <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>
                            This is how others will see you on the site.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={session?.user?.image || ''} />
                                <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="font-semibold">{session?.user?.name}</h4>
                                <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
                            </div>
                         </div>
                         <Separator />
                         <div className="grid gap-2">
                            <Label>Display Name</Label>
                            <Input defaultValue={session?.user?.name || ''} />
                         </div>
                         <div className="grid gap-2">
                             <Label>Email</Label>
                             <Input defaultValue={session?.user?.email || ''} disabled />
                         </div>
                    </CardContent>
                    <CardFooter>
                        <Button>Save Changes</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Security</CardTitle>
                        <CardDescription>
                             Manage your account security and authentication methods.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                             <div className="space-y-0.5">
                                <Label>Two-factor Authentication</Label>
                                <p className="text-sm text-muted-foreground">Secure your account with 2FA.</p>
                             </div>
                             <Switch disabled />
                        </div>
                        <div className="flex items-center justify-between">
                             <div className="space-y-0.5">
                                <Label>Delete Account</Label>
                                <p className="text-sm text-muted-foreground">Permanently remove your account and all of its content.</p>
                             </div>
                             <Button variant="destructive">Delete Account</Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>
                            Configure how you receive notifications.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="flex items-center justify-between">
                             <div className="space-y-0.5">
                                <Label>Email Notifications</Label>
                                <p className="text-sm text-muted-foreground">Receive emails about your account activity.</p>
                             </div>
                             <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                             <div className="space-y-0.5">
                                <Label>Marketing Emails</Label>
                                <p className="text-sm text-muted-foreground">Receive emails about new products, features, and more.</p>
                             </div>
                             <Switch />
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-4">
                 <Card>
                    <CardHeader>
                        <CardTitle>Billing Plan</CardTitle>
                        <CardDescription>
                            You are currently on the <strong>Free Plan</strong>.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                                <Wallet className="h-6 w-6 text-muted-foreground" />
                                <div>
                                    <p className="font-medium">Free Plan</p>
                                    <p className="text-sm text-muted-foreground">$0.00 / month</p>
                                </div>
                            </div>
                            <Button variant="outline">Upgrade</Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  )
}
