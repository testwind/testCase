// importerTblCarelog.ts
import { DataTransformer } from './dataTransformer';

// define source data type (CSV row)
interface CSVRow {
  franchisor_id: string;
  agency_id: string;
  carelog_id: string;
  caregiver_id: string;
  parent_id: string;
  start_datetime: string;
  end_datetime: string;
  clock_in_actual_datetime: string;
  clock_out_actual_datetime: string;
  clock_in_method: string;
  clock_out_method: string;
  status: string;
  split: string;
  documentation: string;
  general_comment_char_count: string;
}

// define target table type
export interface ImportDataTblCarelog {
  carelog_id: string | null;
  caregiver_id: string | null;
  agency_id: string | null;
  parent_id: string | null;
  start_datetime: string | null;
  end_datetime: string | null;
  clock_in_actual_datetime: string | null;
  clock_out_actual_datetime: string | null;
  clock_in_method: number | null;
  clock_out_method: number | null;
  status: number | null;
  split: boolean | null;
  general_comment_char_count: number | null;
}


// data transformer tool class
export class DataTransformer4 extends DataTransformer {
  static transform(row: CSVRow): ImportDataTblCarelog {
    return {
      carelog_id: this.cleanString(row.carelog_id),
      caregiver_id: this.cleanString(row.caregiver_id),
      agency_id: this.cleanString(row.agency_id),
      parent_id: this.cleanString(row.parent_id),
      start_datetime: this.formatDate(row.start_datetime),
      end_datetime: this.formatDate(row.end_datetime),
      clock_in_actual_datetime: this.formatDate(row.clock_in_actual_datetime),
      clock_out_actual_datetime: this.formatDate(row.clock_out_actual_datetime),
      clock_in_method: this.parseNumber(row.clock_in_method),
      clock_out_method: this.parseNumber(row.clock_out_method),
      status: this.parseNumber(row.status),
      split: this.parseBoolean(row.split),
      general_comment_char_count: this.parseNumber(row.general_comment_char_count)
    };
  }
}
