import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard } from "lucide-react"

export default function BillingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
       <Card className="w-full max-w-md border-dashed">
        <CardContent className="flex flex-col items-center gap-4 p-10">
            <div className="p-3 bg-muted rounded-full">
                <CreditCard className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
                <h1 className="text-2xl font-bold mb-2">Billing & Subscription</h1>
                <p className="text-muted-foreground mb-4">Manage your Plus subscription and payment methods.</p>
                <Badge variant="secondary">Coming Soon</Badge>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
