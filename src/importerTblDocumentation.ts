// importerTblDocumentation.ts
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
export interface ImportDataTblDocumentation {
  carelog_id: string | null;
  documentation: string | null;
}

// data transformer tool class
export class DataTransformer5 extends DataTransformer {
  static transform(row: CSVRow): ImportDataTblDocumentation {
    return {
      carelog_id: this.cleanString(row.carelog_id),
      documentation: row.documentation
    };
  }
}

