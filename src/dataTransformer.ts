// dataTransformer.ts

// status map
const statusMap: Record<string, boolean> = {
  'active': true,
  'deactivated': false,
  'true': true,
  'false': false
};


const applicantStatusMap: Record<string, number> = {
    '': 0,
    'new applicant': 1,
    'not hired': 2,
    'application completed': 3,
    'hired': 4,
    'complete orientation/training': 5,
    'paper work received': 6,
    'interview scheduled': 7,
    'interview completed': 8,
    'offer of hiring given': 9,
    'passed phone screen': 10,
    'conditional offer given': 11,
    'passed reference check': 12,
    'passed background check': 13,
    'passed skills screening test': 14
};


// define target data type
interface ImportCaregiver {
  profile_id: string | null;
  caregiver_id: string | null;
  agency_id: string | null;
  external_id: string | null;
  locations_id: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string | null;
  gender: 'M' | 'F' | null;
  birthday_date: string | null;
  onboarding_date: string | null;
  applicant: boolean | null;
  applicant_status: number | null;
  status: boolean | null;
}



// data transformer tool class
export class DataTransformer {
  static cleanString(value: string | null): string | null {
    if (!value) return null;
    return value.trim();
  }

  static parseNumber(value: string | null): number | null {
    if (!value) return null;
    const cleaned = value.trim();
    const num = Number.parseInt(cleaned, 10);
    return isNaN(num) || cleaned !== String(num) ? null : num;
  }

  static parseGender(value: string | null): 'M' | 'F' | null {
    if (!value) return null;
    const cleaned = value.trim().toLowerCase();
    if (cleaned === 'm' || cleaned.startsWith('male')) return 'M';
    if (cleaned === 'f' || cleaned.startsWith('female')) return 'F';
    return null;
  }

  static parseBoolean(value: string | null): boolean | null {
    if (!value) return null;
    const cleaned = value.trim().toLowerCase();
    return statusMap[cleaned] ?? null;
  }

  static parseStatusNumber(value: string | null): number | null {
    if (!value) return null;
    const cleaned = value.trim().toLowerCase();
    return applicantStatusMap[cleaned] ?? null;
  }

  static formatDate(value: string | null): string | null {
    if (!value) return null;
    const cleaned = value.trim();
    
    // support multiple date formats
    const date = new Date(cleaned);
    if (isNaN(date.getTime())) return null;
    
    // 标准化为 MySQL 日期格式
    return date.toISOString().replace('T', ' ').substring(0, 19);
  }

  static transform(row: any): any {
    throw new Error('transform method must be implemented.');
  }

}
