import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const StoreSubmissionSchema = schema.create({
  source_code: schema.string({}, []),
  language: schema.string({ trim: true, escape: true }, []),
  problem_id: schema.string({ trim: true, escape: true }, [
    rules.exists({ table: 'problems', column: 'id', whereNot: { is_deleted: true } }),
  ]),
})

export const EditSubmissionSchema = schema.create({
  source_code: schema.string.optional({}, []),
  language: schema.string.optional({ trim: true, escape: true }, []),
  problem_id: schema.string.optional({ trim: true, escape: true }, [
    rules.exists({ table: 'problems', column: 'id', whereNot: { is_deleted: true } }),
  ]),
})
