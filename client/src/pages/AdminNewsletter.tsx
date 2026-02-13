import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Mail, CheckCircle2, XCircle } from "lucide-react";

export default function AdminNewsletter() {
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; sent: number; failed: number; message?: string } | null>(null);

  const sendNewsletterMutation = trpc.newsletter.sendDaily.useMutation({
    onSuccess: (data) => {
      setResult(data);
      setIsSending(false);
      if (data.success) {
        toast.success(`Newsletter enviado a ${data.sent} suscriptores`);
      } else {
        toast.error((data as any).message || "Error al enviar newsletter");
      }
    },
    onError: (error) => {
      setIsSending(false);
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleSendNewsletter = async () => {
    if (isSending) return;
    
    setIsSending(true);
    setResult(null);
    sendNewsletterMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-newsprint p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="border-4 border-ink shadow-[8px_8px_0px_0px_#1A1A1A]">
          <CardHeader className="border-b-4 border-ink bg-white">
            <CardTitle className="text-3xl font-headline flex items-center gap-3">
              <Mail className="w-8 h-8 text-rust" />
              Newsletter del Diario Coyoacán
            </CardTitle>
            <CardDescription className="text-lg font-body">
              Envía el artículo más reciente a todos los suscriptores
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8 bg-white">
            <div className="space-y-6">
              <div className="bg-newsprint border-2 border-ink p-6">
                <h3 className="font-subhead text-lg uppercase tracking-wider mb-4">
                  ¿Cómo funciona?
                </h3>
                <ul className="space-y-2 font-body text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-rust font-bold">1.</span>
                    <span>Se obtiene el artículo más reciente publicado en el Diario Coyoacán</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rust font-bold">2.</span>
                    <span>Se genera un email HTML con el diseño del periódico</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rust font-bold">3.</span>
                    <span>Se envía el email a todos los suscriptores usando Resend API</span>
                  </li>
                </ul>
              </div>

              {result && (
                <div className={`border-4 p-6 ${result.success ? 'border-green-600 bg-green-50' : 'border-red-600 bg-red-50'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    {result.success ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <h4 className="font-subhead text-xl uppercase">
                      {result.success ? 'Newsletter Enviado' : 'Error al Enviar'}
                    </h4>
                  </div>
                  <div className="font-body space-y-1">
                    <p><strong>Enviados exitosamente:</strong> {result.sent}</p>
                    <p><strong>Fallidos:</strong> {result.failed}</p>
                    {result.message && <p className="text-sm italic mt-2">{result.message}</p>}
                  </div>
                </div>
              )}

              <Button
                onClick={handleSendNewsletter}
                disabled={isSending}
                className="w-full h-16 text-lg font-subhead uppercase tracking-wider bg-rust hover:bg-rust/90 text-white border-4 border-ink shadow-[6px_6px_0px_0px_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#1A1A1A] transition-all"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Enviando Newsletter...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5 mr-2" />
                    Enviar Newsletter Ahora
                  </>
                )}
              </Button>

              <div className="bg-yellow-50 border-2 border-yellow-600 p-4 text-sm font-body">
                <p className="font-bold text-yellow-800 mb-2">⚠️ Nota Importante:</p>
                <p className="text-yellow-700">
                  Esta acción enviará el email a TODOS los suscriptores. Asegúrate de que el artículo más reciente
                  esté correctamente publicado antes de enviar el newsletter.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
