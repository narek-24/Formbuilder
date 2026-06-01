import type { FormSchema } from "../../schemas/form-schemas";

export type Template = {
  title: string;
  description: string;
  fields: FormSchema;
  templateDescription: string;
};

export const TEMPLATES: Template[] = [
  {
    title: "Customer Satisfactory",
    description:
      "This quick form will help us understand what we’re doing well and where we can improve. It only takes a few minutes, and your feedback makes a big difference.",
    templateDescription: "Collect customer feedback on products and services.",
    fields: [
      {
        id: "a5c08a68-dcad-44f1-9e47-ae35587fe04c",
        type: "text",
        category: "input",
        description: "Please enter your full name",
        isRequired: true,
        label: "Full name",
        isSaved: true,
        longAnswer: false,
        placeholder: "John Smith",
      },

      {
        id: "9cbf443c-e3cb-4474-8adc-3e491c12815f",
        type: "text",
        isSaved: true,
        category: "input",
        description: "If you're filling this out on behalf of a business.",
        isRequired: false,
        label: "Company/Organization Name",
        longAnswer: false,
        placeholder: "Your answer",
      },

      {
        id: "5ce1d95e-2277-4b51-a658-becc6d52030b",
        type: "options",
        isSaved: true,
        category: "input",
        multipleAnswers: true,
        description: "",
        isRequired: true,
        label: "How did you hear about us?",
        options: [
          {
            value: "Social media",
          },
          {
            value: "Search engine (e.g. Google)",
          },
          {
            value: "Word of mouth",
          },
          {
            value: "Advertisement",
          },
          {
            value: "Other",
          },
        ],
      },
      {
        id: "45bc89eb-d40b-41b1-b9ef-4b1e1b4df46d",
        type: "text",
        isSaved: true,
        category: "input",
        description: "Describe briefly what you used or purchased.",
        isRequired: true,
        label: "What service or product did you use?",
        longAnswer: true,
        placeholder: "Your answer",
      },

      {
        id: "c06f4ddf-b666-47b4-b20a-e8dd0545f92c",
        type: "options",
        isSaved: true,
        category: "input",
        description: "How easy was it to use and find what you needed?",
        isRequired: true,
        multipleAnswers: false,
        label: "Ease of Use / Navigation",
        options: [
          {
            value: "Very Satisfied",
          },
          {
            value: "Satisfied",
          },
          {
            value: "Neutral",
          },
          {
            value: "Dissatisfied",
          },
          {
            value: "Very Dissatisfied",
          },
        ],
      },
      {
        id: "d6998da4-a112-4a4a-b2af-963bf673651d",
        type: "options",
        isSaved: true,
        multipleAnswers: false,
        category: "input",
        description: "How well did the product meet your expectations?",
        isRequired: true,
        label: "Product/Service Quality",
        options: [
          {
            value: "Very Satsified",
          },
          {
            value: "Satisfied",
          },
          {
            value: "Neutral",
          },
          {
            value: "Dissatisfied",
          },
          {
            value: "Very Dissatisfied",
          },
        ],
      },

      {
        id: "249766ee-76ab-4404-85b5-2b29451d11d3",
        type: "text",
        isSaved: true,
        category: "input",
        description:
          "Share the highlights or what stood out positively. (Optional)",
        isRequired: false,
        label: "What did you like most about your experience?",
        longAnswer: true,
        placeholder: "Your answer",
      },
      {
        id: "397b8d85-6aa6-41ec-baad-9b1cb3d64807",
        type: "text",
        isSaved: true,
        category: "input",
        description:
          "Tell us about anything you feel could be better. (Optional)",
        isRequired: false,
        label: "What could we improve?",
        longAnswer: true,
        placeholder: "Your answer",
      },
      {
        id: "5c2de75f-2cb6-48d3-b7ef-5777395eab5b",
        type: "text",
        isSaved: true,
        category: "input",
        description:
          "Describe any negative experiences you encountered. (Optional)",
        isRequired: false,
        label: "Were there any issues or problems?",
        longAnswer: true,
        placeholder: "Your answer",
      },

      {
        id: "7c4a5360-6036-40c6-a79e-349930a799f4",
        type: "options",
        isSaved: true,
        multipleAnswers: false,
        category: "input",
        description: "",
        isRequired: true,
        label: "How likely are you to recommend us to others?",
        options: [
          {
            value: "Very Likely",
          },
          {
            value: "Likely",
          },
          {
            value: "Unlikely",
          },
          {
            value: "Very Unlikely",
          },
        ],
      },
    ],
  },
  {
    title: "Event Feedback",
    description:
      "Help us improve future events by sharing your thoughts. This quick form covers different aspects of the event—from planning and communication to the overall experience. Your input helps us make our events even better!",
    templateDescription:
      "Evaluate event experiences and gather attendee insights.",
    fields: [
      {
        id: "event-2",
        type: "text",
        isSaved: true,
        category: "input",
        description: "Please enter your full name (optional)",
        isRequired: false,
        label: "Full Name",
        longAnswer: false,
        placeholder: "Jane Doe",
      },

      {
        id: "event-4",
        type: "text",
        isSaved: true,
        category: "input",
        description: "Which event are you giving feedback on?",
        isRequired: true,
        label: "Event Name",
        longAnswer: false,
        placeholder: "e.g., Spring Leadership Summit",
      },

      {
        id: "event-7",
        type: "options",
        isSaved: true,
        category: "input",
        multipleAnswers: false,
        description: "How would you rate your overall experience?",
        isRequired: true,
        label: "Overall Satisfaction",
        options: [
          { value: "Excellent" },
          { value: "Good" },
          { value: "Average" },
          { value: "Poor" },
          { value: "Very Poor" },
        ],
      },
      {
        id: "event-8",
        type: "options",
        isSaved: true,
        multipleAnswers: false,
        category: "input",
        description: "Did the event meet your expectations?",
        isRequired: true,
        label: "Expectations Met",
        options: [
          { value: "Exceeded Expectations" },
          { value: "Met Expectations" },
          { value: "Somewhat Met" },
          { value: "Did Not Meet Expectations" },
        ],
      },
      {
        id: "event-9",
        type: "text",
        isSaved: true,
        category: "input",
        description:
          "Please share highlights or sessions you particularly enjoyed.",
        isRequired: false,
        label: "Favorite Moments",
        longAnswer: true,
        placeholder: "Your answer",
      },
      {
        id: "event-10",
        type: "text",
        isSaved: true,
        category: "input",
        description:
          "If there were any parts of the event that didn’t go as expected, let us know.",
        isRequired: false,
        label: "Areas for Improvement",
        longAnswer: true,
        placeholder: "Your answer",
      },
      {
        id: "event-11",
        type: "options",
        isSaved: true,
        multipleAnswers: false,
        category: "input",
        description:
          "Would you attend this event again or recommend it to a colleague?",
        isRequired: true,
        label: "Future Attendance",
        options: [
          { value: "Yes, definitely" },
          { value: "Maybe" },
          { value: "No" },
        ],
      },
    ],
  },
  {
    title: "Employee Satisfaction",
    description:
      "We’re committed to creating a positive work environment where everyone can thrive. This form is completely anonymous and helps us better understand how our team is feeling, what’s working, and what needs improvement.",
    templateDescription: "Gauge employee morale and workplace satisfaction.",
    fields: [
      {
        id: "emp-2",
        type: "text",
        isSaved: true,
        category: "input",
        description: "Department or team you work in (optional)",
        isRequired: false,
        label: "Department",
        longAnswer: false,
        placeholder: "e.g., Marketing, Engineering",
      },
      {
        id: "emp-3",
        type: "options",
        isSaved: true,
        multipleAnswers: false,
        category: "input",
        description: "How would you rate your overall job satisfaction?",
        isRequired: true,
        label: "Overall Job Satisfaction",
        options: [
          { value: "Very Satisfied" },
          { value: "Satisfied" },
          { value: "Neutral" },
          { value: "Dissatisfied" },
          { value: "Very Dissatisfied" },
        ],
      },
      {
        id: "emp-4",
        type: "options",
        multipleAnswers: false,
        isSaved: true,
        category: "input",
        description: "Do you feel your contributions are valued?",
        isRequired: true,
        label: "Recognition & Value",
        options: [
          { value: "Always" },
          { value: "Often" },
          { value: "Sometimes" },
          { value: "Rarely" },
          { value: "Never" },
        ],
      },
      {
        id: "emp-5",
        type: "options",
        multipleAnswers: false,
        isSaved: true,
        category: "input",
        description: "Do you feel supported by your direct manager?",
        isRequired: true,
        label: "Manager Support",
        options: [
          { value: "Strongly Agree" },
          { value: "Agree" },
          { value: "Neutral" },
          { value: "Disagree" },
          { value: "Strongly Disagree" },
        ],
      },
      {
        id: "emp-6",
        type: "options",
        multipleAnswers: false,
        isSaved: true,
        category: "input",
        description:
          "How satisfied are you with communication within your team?",
        isRequired: true,
        label: "Team Communication",
        options: [
          { value: "Very Satisfied" },
          { value: "Satisfied" },
          { value: "Neutral" },
          { value: "Dissatisfied" },
          { value: "Very Dissatisfied" },
        ],
      },
      {
        id: "emp-7",
        type: "text",
        isSaved: true,
        category: "input",
        description: "What do you enjoy most about your current role?",
        isRequired: false,
        label: "Positives in Your Role",
        longAnswer: true,
        placeholder: "Your answer",
      },
      {
        id: "emp-8",
        type: "text",
        isSaved: true,
        category: "input",
        description: "What would you like to see improved in the company?",
        isRequired: false,
        label: "Opportunities for Improvement",
        longAnswer: true,
        placeholder: "Your answer",
      },
      {
        id: "emp-9",
        type: "options",
        multipleAnswers: false,
        isSaved: true,
        category: "input",
        description:
          "Would you recommend this company as a good place to work?",
        isRequired: true,
        label: "Likelihood to Recommend",
        options: [
          { value: "Definitely" },
          { value: "Probably" },
          { value: "Not Sure" },
          { value: "Probably Not" },
          { value: "Definitely Not" },
        ],
      },
    ],
  },
];
