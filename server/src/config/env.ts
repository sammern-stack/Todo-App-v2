const requiredEnvVars = ["PORT", "NODE_ENV", "CLIENT_URL"] as const;

// Verify the existence of environmental variables
requiredEnvVars.forEach((key) => {
  if (!process.env[key])
    throw new Error(`Environmental var ${key} is required`);
});

export const config = {
  port: Number(process.env.PORT) || 3000,
  isProduction: process.env.NODE_ENV === "production",
  clientUrl: process.env.CLIENT_URL!,
};
