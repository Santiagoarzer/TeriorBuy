import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Create a dummy user (Designer)
    const designer = await prisma.user.upsert({
        where: { email: 'designer@teriorbuy.com' },
        update: {},
        create: {
            id: 'user_designer_1',
            email: 'designer@teriorbuy.com',
            firstName: 'Elena',
            lastName: 'Rossi',
            role: 'DESIGNER',
            imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
        },
    })

    console.log({ designer })

    // Create a Space
    const space = await prisma.space.create({
        data: {
            title: 'Modern Minimalist Living Room',
            description: 'A serene living space featuring natural materials and soft lighting.',
            imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=2000&auto=format&fit=crop',
            location: 'Milan, Italy',
            type: 'Residential',
            ownerId: designer.id,
            products: {
                create: [
                    {
                        name: 'Velvet Sofa',
                        description: 'Luxurious green velvet sofa with gold legs.',
                        price: 1299.00,
                        imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
                        xPosition: 50,
                        yPosition: 60,
                    },
                    {
                        name: 'Marble Coffee Table',
                        description: 'White carrara marble coffee table.',
                        price: 450.00,
                        imageUrl: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=800&auto=format&fit=crop',
                        xPosition: 50,
                        yPosition: 80,
                    },
                ],
            },
        },
    })

    console.log({ space })

    // Create another Space
    const space2 = await prisma.space.create({
        data: {
            title: 'Industrial Loft Kitchen',
            description: 'Open concept kitchen with exposed brick and metal accents.',
            imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2000&auto=format&fit=crop',
            location: 'Brooklyn, NY',
            type: 'Residential',
            ownerId: designer.id,
            products: {
                create: [
                    {
                        name: 'Pendant Light',
                        description: 'Matte black industrial pendant light.',
                        price: 120.00,
                        imageUrl: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=800&auto=format&fit=crop',
                        xPosition: 30,
                        yPosition: 20,
                    },
                    {
                        name: 'Bar Stool',
                        description: 'Leather and iron bar stool.',
                        price: 180.00,
                        imageUrl: 'https://images.unsplash.com/photo-1503602642458-2321114458ed?q=80&w=800&auto=format&fit=crop',
                        xPosition: 60,
                        yPosition: 70,
                    },
                ],
            },
        },
    })

    console.log({ space2 })
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
