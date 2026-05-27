export const getMemberDuration = (createdAt: string): {memberSince:string, duration:string} => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();

  let years = currentDate.getFullYear() - createdDate.getFullYear();
  let months = currentDate.getMonth() - createdDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  const memberSince = createdDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return {
    memberSince,
    duration: `${years} years ${months} months on platform`,
  };
};