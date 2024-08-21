import { type DBTX, schema } from '../db'
import { and, eq } from 'drizzle-orm'

export async function getOrganizationBySlug(
    db: DBTX,
    slug: string,
    userId: string,
) {
    const [result] = await db
        .select({
            id: schema.organizations.id,
            name: schema.organizations.name,
            slug: schema.organizations.slug,
            role: schema.organizationMembers.role,
        })
        .from(schema.organizations)
        .innerJoin(
            schema.organizationMembers,
            and(
                eq(schema.organizations.slug, slug),
                eq(
                    schema.organizationMembers.organizationId,
                    schema.organizations.id,
                ),
                eq(schema.organizationMembers.userId, userId),
            ),
        )
        .limit(1)

    if (!result) {
        return null
    }

    return result
}
