import { ExceptionFilter } from './ExceptionFilter';
import Exception from 'src/components/Exception/index';

export class ExceptionNormal extends ExceptionFilter {
  OnCatch(e: Exception) {}
}
