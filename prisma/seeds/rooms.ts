import { prisma } from "@/prisma"

async function main() {
    const rooms = await prisma.room.createMany({
        data: [
            {
                name: 'Livingroom',
                description: 'The place where we live',
            },
            {
                name: 'Bedroom',
                description: 'The place where we bed',
            },
            {
                name: 'Bathroom',
                description: 'The place where we bathe',
            },
            {
                name: 'Hallway',
                description: 'The place where we hall',
            },
            {
                name: 'Utility closet',
                description: 'The place where we utility',
            },
            {
                name: 'Kitchen',
                description: 'The place where we kitchen',
            },
            {
                name: 'Dining nook',
                description: 'The place where we dine',
            },
            {
                name: 'Office',
                description: 'The place where we office',
            },
            {
                name: 'Garage',
                description: 'The place where we garage',
            },
        ]
    })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })