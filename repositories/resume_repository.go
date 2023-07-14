package repositories

import (
	"go-resume/lib"
	"go-resume/models"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type ResumeRepository struct {
	DB *gorm.DB
}

func NewResumeRepository(ctx lib.AppContext) *ResumeRepository {
	return &ResumeRepository{DB: ctx.GetDB()}
}

func (r *ResumeRepository) CreateResume(resume *models.Resume) error {
	return r.DB.Create(resume).Error
}

// 更新
func (r *ResumeRepository) UpdateResume(resume *models.Resume) error {
	return r.DB.Session(&gorm.Session{FullSaveAssociations: true}).Save(resume).Error
}

func (r *ResumeRepository) DeleteResume(resume *models.Resume) error {
	return r.DB.Delete(resume).Error
}

func (r *ResumeRepository) GetResumeByID(resumeID uint) (*models.Resume, error) {
	var resume models.Resume
	err := r.DB.Preload(clause.Associations).Where("id = ?", resumeID).First(&resume).Error
	if err != nil {
		return nil, err
	}
	return &resume, nil
}

func (r *ResumeRepository) GetResumesByUserID(userID uint) (*models.Resume, error) {
	var resume *models.Resume
	err := r.DB.Preload(clause.Associations).Where("user_id = ?", userID).First(&resume).Error
	if err != nil {
		return nil, err
	}
	return resume, nil
}
