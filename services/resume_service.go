package services

import (
	"go-resume/lib"
	"go-resume/models"
	"go-resume/repositories"
)

type ResumeService struct {
	ResumeRepository *repositories.ResumeRepository
}

func NewResumeService(ctx lib.AppContext) *ResumeService {
	return &ResumeService{ResumeRepository: repositories.NewResumeRepository(ctx)}
}

func (s *ResumeService) GetResumeByID(resumeID uint) (*models.Resume, error) {
	return s.ResumeRepository.GetResumeByID(resumeID)
}

func (s *ResumeService) GetResumesByUserID(userID uint) (*models.Resume, error) {
	return s.ResumeRepository.GetResumesByUserID(userID)
}

func (s *ResumeService) CreateOrUpdateResume(id uint, requestBody *models.Resume) error {
	if id == 0 {
		return s.ResumeRepository.CreateResume(requestBody)
	}
	resume, _ := s.GetResumeByID(id)

	// 更新 Resume 模型对象的字段
	resume.Email = requestBody.Email
	resume.UserName = requestBody.UserName
	resume.IntendedJob = requestBody.IntendedJob
	resume.Address = requestBody.Address
	resume.Age = requestBody.Age
	resume.Sex = requestBody.Sex
	resume.Phone = requestBody.Phone
	resume.Qualification = requestBody.Qualification

	// 更新 ItemDetails 的特定字段
	for _, updatedItem := range requestBody.ItemDetails {
		for i, existingItem := range resume.ItemDetails {
			if updatedItem.ID == existingItem.ID {
				// 更新特定字段
				existingItem.Name = updatedItem.Name
				existingItem.Detail = updatedItem.Detail
				// 在切片中更新对应位置的对象
				resume.ItemDetails[i] = existingItem
				break
			}
		}
	}
	return s.ResumeRepository.UpdateResume(resume)
}
