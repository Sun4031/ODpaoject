export default function access(
  initialState: { currentUser?: API.CurrentUser } | undefined,
) {
  const { currentUser } = initialState ?? {};
  return {
    adminRouteFilter: () => currentUser?.account_type === "ADMIN",
    normalRouteFilter: () => currentUser?.account_type === "STAFF",
    // 新增规则：禁止 ADMIN 访问 merchant
    denyAdminForMerchant: () => currentUser?.account_type !== "ADMIN",
  };
}
