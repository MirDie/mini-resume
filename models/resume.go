package models

import "gorm.io/gorm"

type Resume struct {
	gorm.Model
	UserID        uint         `gorm:"not null,unique" json:"userId"`
	UserName      string       `gorm:"not null" json:"username"`
	Email         string       `gorm:"not null" json:"email"`
	IntendedJob   string       `gorm:"not null" json:"intendedJob"`
	Phone         string       `gorm:"default:null" json:"phone"`
	Address       string       `gorm:"default:null" json:"address"`
	Age           uint         `gorm:"not null" json:"age"`
	Sex           string       `gorm:"not null" json:"sex"`
	ItemDetails   []ResumeItem `json:"itemDetails"`
	Qualification string       `gorm:"default:null" json:"qualification"`
	User          User         `gorm:"ForeignKey:UserID"`
}

type ResumeItem struct {
	gorm.Model
	ResumeID uint     `gorm:"not null" json:"resumeId"`
	ItemType itemType `gorm:"not null" json:"itemType"`
	Name     string   `gorm:"not null" json:"name"`
	Detail   string   `gorm:"not null" json:"detail"`
}

type itemType string

const (
	ItemTypeEducation      itemType = "education"
	ItemTypeTechnicalSkill itemType = "technologyStack"
	ItemTypeWorkExperience itemType = "workExperience"
)
