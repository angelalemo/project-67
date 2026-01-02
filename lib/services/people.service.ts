import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../constants/api';
import { PersonType } from '@/app/data/people';

export interface CreatePersonDto {
  name: string;
  nickname: string;
  phone_number: string;
  image_file?: File;
}

export interface UpdatePersonDto extends Partial<CreatePersonDto> {
  id: string;
}

/**
 * People Service - Business logic layer
 */
export class PeopleService {
  /**
   * ดึงข้อมูลคนทั้งหมด
   */
  async getAll(): Promise<PersonType[]> {
    try {
      const data = await apiClient.get<PersonType[]>(API_ENDPOINTS.people);
      console.log('✅ Fetched people:', data.length, 'records');
      return data;
    } catch (error) {
      console.error('❌ Failed to fetch people:', error);
      throw new Error('ไม่สามารถดึงข้อมูลได้');
    }
  }

  /**
   * สร้างข้อมูลคนใหม่
   */
  async create(dto: CreatePersonDto): Promise<PersonType> {
    try {
      const formData = this.buildFormData(dto);
      const result = await apiClient.post<PersonType>(API_ENDPOINTS.people, formData);
      console.log('✅ Created person:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to create person:', error);
      throw new Error('ไม่สามารถเพิ่มข้อมูลได้');
    }
  }

  /**
   * อัปเดตข้อมูลคน
   */
  async update(dto: UpdatePersonDto): Promise<PersonType> {
    try {
      const formData = this.buildFormData(dto);
      const result = await apiClient.patch<PersonType>(
        API_ENDPOINTS.peopleById(dto.id),
        formData
      );
      console.log('✅ Updated person:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to update person:', error);
      throw new Error('ไม่สามารถอัปเดตข้อมูลได้');
    }
  }

  /**
   * สร้าง FormData จาก DTO
   */
  private buildFormData(dto: CreatePersonDto | UpdatePersonDto): FormData {
    const formData = new FormData();
    
    if (dto.name) formData.append('name', dto.name);
    if (dto.nickname) formData.append('nickname', dto.nickname);
    if (dto.phone_number) formData.append('phone_number', dto.phone_number);
    if (dto.image_file) formData.append('image', dto.image_file);

    return formData;
  }
}

// Export singleton instance
export const peopleService = new PeopleService();
