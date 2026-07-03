export type ProductEvent = "page_view" | "calculation_completed" | "document_selected" | "document_analysis_completed" | "broker_lead_submitted";

export function track(event:ProductEvent,properties:Record<string,string|number|boolean>={}){
  if(typeof window==="undefined")return;
  const detail={event,properties,timestamp:new Date().toISOString()};
  window.dispatchEvent(new CustomEvent("homebuying:analytics",{detail}));
  const analyticsWindow=window as typeof window & {dataLayer?:unknown[]};
  analyticsWindow.dataLayer?.push(detail);
}
