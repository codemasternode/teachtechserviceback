import authRoutes from "./authRoutes";

export default router => {
  return {
    authRouter: authRoutes(router)
  };
};
