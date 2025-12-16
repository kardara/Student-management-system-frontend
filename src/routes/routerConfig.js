const ROLES = {
    ADMIN: "admin",
    STUDENT: "student",
    LECTURER: "lecturer",
    ASSISTANT: "assistant",
    REGISTRAR: "registrar"
}

export default routerConfig = {

    //public Routes
    publicRoutes: [
        {
            path: "auth/oauth2/failed",
            componentName: "OauthFailed"
        },
        {
            path: "auth/oauth2",
            componentName: "OauthRedirect"
        },
        {
            path: "unauthorized",
            componentName: "Unauthorized"
        }
    ],

    // public only routes (accessible only when  non auth)
    publicOnlyRoutes: [
        {
            path: "auth/login",
            componentName: "Login"
        },
        {
            path: "auth/signup",
            componentName: "Signup"
        }
    ],

    // Protected routes by role
    protectedRoutes: [
        // Routes for any authenticated user
        {
            path: "/",
            componentName: "Dashboard",
            roles: null // null means any authenticated user
        },

        {
            path: "/profile",
            componentName: "UserProfile",
            roles: null
        },

        // Admin routes for examp;e
        {
            path: "/admin",
            componentName: "AdminPanel",
            roles: ROLES.ADMIN
        },

    ]

}
