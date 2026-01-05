import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../constants/api';
import { PersonType } from '@/app/data/people';
import { ApiResponse } from '../types/api';

export interface CreatePersonDto {
  name: string;
  nickname: string;
  phone_number: string;
  image_file?: File;
}

export interface UpdatePersonDto extends Partial<CreatePersonDto> {
  id: string;
}

export class PeopleService {
  /*ดึงข้อมูลคนทั้งหมด*/
  async getAll(): Promise<PersonType[]> {
    try {
    const response = await apiClient.get<ApiResponse<PersonType[]>>(API_ENDPOINTS.people);
    const people = Array.isArray(response.data) ? response.data : [];
    console.log('✅ Fetched people:', people.length, 'records');
    return people;
    } catch (error) {
      console.error('❌ Failed to fetch people:', error);
      throw new Error('ไม่สามารถดึงข้อมูลได้');
    }
  }

  /*สร้างข้อมูลคนใหม่*/
  async create(dto: CreatePersonDto): Promise<PersonType> {
    try {
      const formData = this.buildFormData(dto);
      const response = await apiClient.post<ApiResponse<PersonType>>(API_ENDPOINTS.people, formData);
      console.log('✅ Created person:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Failed to create person:', error);
      throw new Error('ไม่สามารถเพิ่มข้อมูลได้');
    }
  }

  /*อัปเดตข้อมูลคน*/
  async update(dto: UpdatePersonDto): Promise<PersonType> {
    if (!dto.id) {
      throw new Error('ID is required for update');
    }
    
    try {
      const formData = this.buildFormData(dto);
      const response = await apiClient.patch<ApiResponse<PersonType>>(
        API_ENDPOINTS.peopleById(dto.id),
        formData
      );
      console.log('✅ Updated person:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Failed to update person:', error);
      throw error;
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

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.peopleById(id));
      console.log('✅ Deleted person:', id);
    } catch (error) {
      console.error('❌ Failed to delete person:', error);
      throw new Error('ไม่สามารถลบข้อมูลได้');
    }
  }
}

// Export singleton instance
export const peopleService = new PeopleService();
