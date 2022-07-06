import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const StoreGuestSchema = schema.create({
  name: schema.string({ escape: true, trim: true }, [rules.minLength(4), rules.maxLength(80)]),
  ra: schema.string({ escape: true, trim: true }, [
    rules.minLength(4),
    rules.maxLength(80),
    rules.unique({ table: 'guests', column: 'ra' }),
  ]),
})
