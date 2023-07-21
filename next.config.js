/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
    
        swcPlugins: [
            //sanities objects so that we can safely pass them even though they have date objects and other complex properties
            // which cannot be passed from server component to client component
            // this removes an error
            ["next-superjson-plugin",{}]
        ]
    },
    images:{
        domains: [
            "res.cloudinary.com",
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com"
        ]
    }
}

module.exports = nextConfig
