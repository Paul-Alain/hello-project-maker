import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LogementEditor } from "@/components/admin/logement-editor";
import { logementsQuery, formatPrice, type Logement } from "@/lib/data";

export function LogementsAdmin({ readOnly = false }: { readOnly?: boolean }) {
  const { data: logements = [], isLoading } = useQuery(logementsQuery);
  const [editing] = useState<Logement | null>(null);
  const [open, setOpen] = useState(false);
  const refresh = () => {};

  return (
    <div>
      {readOnly && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-amber-300/40 bg-amber-50 px-3 py-2 text-xs text-amber-800">
          <span>🔒</span> Mode lecture seule — propriétaire
        </div>
      )}
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin text-gold" />
      ) : (
        <div className="space-y-3">
          {logements.map((l) => (
            <div key={l.id} className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-card p-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate font-medium">{l.title_fr}</p>
                  <Badge variant="secondary">{l.type}</Badge>
                  {!l.available && <Badge variant="destructive">Complet</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{formatPrice(l.price, l.currency)} / {l.price_unit}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <LogementEditor open={open} onOpenChange={setOpen} logement={editing} onSaved={refresh} />
    </div>
  );
}
