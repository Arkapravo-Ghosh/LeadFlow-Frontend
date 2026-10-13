/** Public copy describes shipped behavior; examples contain no customer data. */
export const features = [
  { number: "01", title: "Keep every lead in view.", description: "Add a name, company and phone number. Search your leads and filter by status to find the right conversation." },
  { number: "02", title: "Pick up where you left off.", description: "Log discussions against each lead. Read the latest note at a glance, or open the timeline for the full conversation." },
  { number: "03", title: "Know who needs a follow-up.", description: "Set the next date while saving a note. Today's follow-ups stay in view, and overdue leads are easy to spot." },
] as const;

export const steps = [
  { title: "Create your account", description: "Choose a username and password. Start with your own empty, private workspace." },
  { title: "Add your first lead", description: "A name is all you need. Add company and phone details when you have them." },
  { title: "Log a conversation", description: "Save a note, set a follow-up if needed, and update the lead's status as things move forward." },
] as const;

export const exampleLeads = [
  { name: "Avery Morgan", company: "Northline Studio", status: "Qualified", schedule: "Today · 2:30 PM", note: "Discussed the proposal. Follow up on the next steps." },
  { name: "Sam Rivera", company: "Fieldwork Co.", status: "Contacted", schedule: "Today · 4:00 PM", note: "Shared the overview. Check in after their team review." },
  { name: "Jordan Lee", company: "Common Ground", status: "New", schedule: "Unscheduled", note: "Ready for a first conversation." },
] as const;
