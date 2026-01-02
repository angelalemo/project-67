import { ApiError } from '../types/api';

export type ErrorType = 'network' | 'server' | 'notfound' | 'generic';

/**
 * จำแนกประเภท error เพื่อแสดงผลที่เหมาะสม
 */
export function categorizeError(error: unknown): ErrorType {
  if (error instanceof ApiError) {
    // Network errors
    if (error.message.includes('Failed to fetch') || 
        error.message.includes('Network request failed')) {
      return 'network';
    }
    
    // HTTP status codes
    if (error.status === 404) return 'notfound';
    if (error.status >= 500) return 'server';
  }

  return 'generic';
}

/**
 * สร้างข้อความ error ที่เป็นมิตรกับผู้ใช้
 */
export function getUserFriendlyMessage(error: unknown): string {
  const type = categorizeError(error);
  
  const messages: Record<ErrorType, string> = {
    network: 'ไม่สามารถเชื่อมต่อได้ กรุณาตรวจสอบอินเทอร์เน็ต',
    server: 'เซิร์ฟเวอร์กำลังมีปัญหา กรุณาลองใหม่ในอีกสักครู่',
    notfound: 'ไม่พบข้อมูลที่ต้องการ',
    generic: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
  };

  return messages[type];
}
