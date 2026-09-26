/**
 * @file        : src/lib/dayjs/dayjs.ts
 * @description : إعداد Day.js لاستخدام UTC في المعالجة الداخلية.
 * @updated     : [
 *   { "date": "2026-09-24T00:00:00Z", "version": "0.1.0", "by": ["AI"], "comment": "تفعيل إضافة UTC" }
 * ]
 */

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export { dayjs }
