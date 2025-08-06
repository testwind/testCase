// importerTblCaregiver.ts
import { DataTransformer } from './dataTransformer';

// define source data type (CSV row)
interface CSVRow {
  franchisor_id: string;
  agency_id: string;
  subdomain: string;
  profile_id: string;
  caregiver_id: string;
  external_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  gender: string;
  applicant: string;
  birthday_date: string;
  onboarding_date: string;
  location_name: string;
  locations_id: string;
  applicant_status: string;
  status: string;
}


// define target table type
export interface ImportDataTblCaregiver {
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
export class DataTransformer3 extends DataTransformer {
  static transform(row: CSVRow): ImportDataTblCaregiver {
    return {
      profile_id: this.cleanString(row.profile_id),
      caregiver_id: this.cleanString(row.caregiver_id),
      agency_id: this.cleanString(row.agency_id),
      external_id: this.cleanString(row.external_id),
      locations_id: this.cleanString(row.locations_id),
      first_name: this.cleanString(row.first_name),
      last_name: this.cleanString(row.last_name),
      email: this.cleanString(row.email),
      phone_number: this.cleanString(row.phone_number),
      gender: this.parseGender(row.gender),
      birthday_date: this.formatDate(row.birthday_date),
      onboarding_date: this.formatDate(row.onboarding_date),
      applicant: this.parseBoolean(row.applicant),
      applicant_status: this.parseStatusNumber(row.applicant_status),
      status: this.parseBoolean(row.status)
    };
  }
}

