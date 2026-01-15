import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  MessageSquare, 
  FileText, 
  Upload,
  Download,
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface CACasesListProps {
  status: "active" | "completed";
  onChatOpen: (clientId: string) => void;
}

const activeCases = [
  {
    id: "CASE001",
    clientName: "Vikram Singh",
    clientInitials: "VS",
    itrForm: "ITR-3",
    income: "₹32,00,000",
    progress: 75,
    stage: "Filing",
    deadline: "3 days left",
    lastMessage: "Uploaded Form 16",
    documents: { uploaded: 8, required: 10 },
    status: "on-track"
  },
  {
    id: "CASE002",
    clientName: "Meera Iyer",
    clientInitials: "MI",
    itrForm: "ITR-1",
    income: "₹9,50,000",
    progress: 40,
    stage: "Documents",
    deadline: "5 days left",
    lastMessage: "Need bank statement",
    documents: { uploaded: 3, required: 6 },
    status: "pending-docs"
  },
  {
    id: "CASE003",
    clientName: "Arun Kumar",
    clientInitials: "AK",
    itrForm: "ITR-2",
    income: "₹18,00,000",
    progress: 90,
    stage: "Review",
    deadline: "1 day left",
    lastMessage: "Ready for final review",
    documents: { uploaded: 7, required: 7 },
    status: "urgent"
  }
];

const completedCases = [
  {
    id: "CASE101",
    clientName: "Deepa Sharma",
    clientInitials: "DS",
    itrForm: "ITR-1",
    income: "₹7,20,000",
    completedAt: "2 days ago",
    refund: "₹12,500",
    rating: 5
  },
  {
    id: "CASE102",
    clientName: "Rajesh Patel",
    clientInitials: "RP",
    itrForm: "ITR-3",
    income: "₹28,00,000",
    completedAt: "4 days ago",
    refund: "₹45,000",
    rating: 5
  },
  {
    id: "CASE103",
    clientName: "Kavita Reddy",
    clientInitials: "KR",
    itrForm: "ITR-2",
    income: "₹15,00,000",
    completedAt: "1 week ago",
    refund: "₹8,200",
    rating: 4
  }
];

const statusColors = {
  "on-track": "bg-success/10 text-success",
  "pending-docs": "bg-warning/10 text-warning",
  "urgent": "bg-destructive/10 text-destructive"
};

const statusLabels = {
  "on-track": "On Track",
  "pending-docs": "Pending Docs",
  "urgent": "Urgent"
};

const CACasesList = ({ status, onChatOpen }: CACasesListProps) => {
  if (status === "completed") {
    return (
      <div className="space-y-4">
        {completedCases.map((caseItem) => (
          <div 
            key={caseItem.id}
            className="bg-card rounded-xl border border-border p-4 md:p-5"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Client Info */}
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl bg-success/10 text-success flex items-center justify-center font-display font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{caseItem.clientName}</h3>
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      Completed
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span>{caseItem.itrForm}</span>
                    <span>•</span>
                    <span>{caseItem.income}</span>
                    <span>•</span>
                    <span>Refund: {caseItem.refund}</span>
                  </div>
                </div>
              </div>

              {/* Rating & Actions */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-lg ${i < caseItem.rating ? 'text-warning' : 'text-muted'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">{caseItem.completedAt}</div>
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="w-4 h-4" />
                  Receipt
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activeCases.map((caseItem) => (
        <div 
          key={caseItem.id}
          className="bg-card rounded-xl border border-border p-4 md:p-5"
        >
          <div className="flex flex-col gap-4">
            {/* Header Row */}
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Client Info */}
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center font-display font-bold">
                  {caseItem.clientInitials}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground">{caseItem.clientName}</h3>
                    <Badge 
                      variant="secondary" 
                      className={statusColors[caseItem.status as keyof typeof statusColors]}
                    >
                      {caseItem.status === 'urgent' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {statusLabels[caseItem.status as keyof typeof statusLabels]}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span>{caseItem.itrForm}</span>
                    <span>•</span>
                    <span>{caseItem.income}</span>
                  </div>
                </div>
              </div>

              {/* Meta & Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className={caseItem.status === 'urgent' ? 'text-destructive font-medium' : 'text-muted-foreground'}>
                    {caseItem.deadline}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onChatOpen(caseItem.id)}
                >
                  <MessageSquare className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Eye className="w-4 h-4" />
                  View
                </Button>
                <Button variant="hero" size="sm" className="gap-1">
                  <Upload className="w-4 h-4" />
                  File ITR
                </Button>
              </div>
            </div>

            {/* Progress Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-3 border-t border-border">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    Stage: {caseItem.stage}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {caseItem.progress}%
                  </span>
                </div>
                <Progress value={caseItem.progress} className="h-2" />
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span>
                  {caseItem.documents.uploaded}/{caseItem.documents.required} documents
                </span>
              </div>
            </div>

            {/* Last Activity */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 rounded-lg px-3 py-2">
              <MessageSquare className="w-4 h-4" />
              <span>Last: "{caseItem.lastMessage}"</span>
            </div>
          </div>
        </div>
      ))}

      {activeCases.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No active cases</p>
        </div>
      )}
    </div>
  );
};

export default CACasesList;
