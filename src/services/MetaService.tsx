/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sentry from "@sentry/nextjs";

// const EDIT_PRODUCT_API_URL = process.env.NEXT_PUBLIC_SERVER_HOST + "/api/feedback";

class MetaService {
  sendFeedback(feedback: any): void {
    Sentry.captureFeedback({
      name: feedback.name,
      email: feedback.email,
      message: "RATING: " + feedback.rating + " MESSAGE: " + feedback.feedback,
    });
    // const response = await axios.post(EDIT_PRODUCT_API_URL, feedback, { withCredentials: true });
    // return response;
  }
}

const metaServiceInstance = new MetaService();
export default metaServiceInstance;
