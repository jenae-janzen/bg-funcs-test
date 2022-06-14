import { Context } from "netlify:edge";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);

  // Look for the query parameter, and return if we don't find it
  if (url.searchParams.get("include") !== "pricing") {
    return context.next();
  }

  const response = await context.next();

  if (response.status === 304) {
    return response;
  }

  context.log("Including pricing content into the page");

  const page = await response.text();

  const regex = /price/i;

  const pricingContent = "It's expensive, but buy it anyway.";
  const updatedPage = page.replace(regex, pricingContent);
  return new Response(updatedPage, response);
};