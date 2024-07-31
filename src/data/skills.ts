const skilllist = {
    "React": {
        iconName: "mdi:react",
        url: "https://react.dev/",
        color: "#60C7DE"
    },
    "React Native": {
        iconName: "mdi:react",
        url: "https://reactnative.dev/",
        color: "#60C7DE"
    },
    "TypeScript": {
        iconName: "mdi:language-typescript",
        url: "https://github.com/topics/typescript",
        color: "#3178c6"
    },
    "Capacitor.js": {
        iconName: "logos:capacitorjs-icon",
        url: "https://capacitorjs.com/",
        color: "#35A4EF"
    },
    "Android": {
        iconName: "mdi:android",
        url: "https://android.com/",
        color: "#3DDC84"
    },
    "iOS": {
        iconName: "mdi:apple-ios",
    },
    "Vue": {
        iconName: "logos:vue",
        url: "https://vuejs.org/",
        color: "#41b883"
    },
    "Go": {
        iconName: "logos:go",
        url: "https://go.dev/",
        color: "#00acd7"
    },
    "Tauri": {
        iconName: "logos:tauri",
        url: "https://tauri.app/",
        color: "#24c8db"
    },
    "Git": {
        iconName: "mdi:git",
        url: "https://git-scm.com/",
        color: "#de4c36"
    },
    "Tailwind": {
        iconName: "logos:tailwindcss-icon",
        url: "https://tailwindcss.com/",
        color: "#44a8b3"
    },
    "Python": {
        iconName: "logos:python",
        url: "https://python.org/",
        color: "#3572A5"
    },
    "Linux": {
        iconName: "flat-color-icons:linux",
    },
    "C++": {
        iconName: "mdi:language-cpp",
        url: "https://github.com/topics/cpp?l=c%2B%2B&o",
        color: "#f34b7d"
    },
    "C#": {
        iconName: "mdi:language-csharp",
        url: "https://github.com/topics/c-sharp?l=c%23",
        color: "#178600"
    },
    "Godot": {
        iconName: "logos:godot-icon",
        url: "https://godotengine.org/",
        color: "#478cbf"
    },
    "Unreal Engine": {
        iconName: "mdi:unreal",
        url: "https://www.unrealengine.com/"
    },
    "Astro": {
        iconName: "vscode-icons:file-type-astro",
        url: "https://astro.build/",
        color: "#ff5a03"
    },
    "Bun": {
        iconName: "logos:bun",
        color:"#FBF0DF",
        url: "https://bun.sh/"
    },
    "Blender": {
        iconName: "logos:blender",
        url: "https://blender.org/",
        color: "#e87d0d"
    },
    "OpenAI API": {
        iconName: "simple-icons:openai",
        url: "https://platform.openai.com/docs/api-reference/"
    },
    "Elevenlabs API": {
        iconName: "mdi:two",
        url: "https://elevenlabs.io/api"
    },
    "Adobe Photoshop": {
        iconName: "logos:adobe-photoshop"
    },
    "Adobe Illustrator": {
        iconName: "logos:adobe-illustrator"
    },
    "Adobe Premiere": {
        iconName: "logos:adobe-premiere"
    },
    "Adobe Indesign": {
        iconName: "logos:adobe-indesign"
    },
    "Docker":{
        iconName: "mdi:docker",
        url: "https://www.docker.com/",
        color: "#1d63ed"
    }
} as const;

type Skill = {
    iconName: string
    url?: string
    color?: string
}

type SkillKey = keyof typeof skilllist;
const skills: Record<SkillKey, Skill> = skilllist
export { skills }
export type { SkillKey }