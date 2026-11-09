/** Link a test to a requirement/user-story ID so reports can show traceability. */
export const requirement = (id: string): { type: string; description: string } => ({
  type: 'requirement',
  description: id,
});
