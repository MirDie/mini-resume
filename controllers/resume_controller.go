package controllers

import (
	"go-resume/lib"
	"go-resume/models"
	"go-resume/services"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ResumeController struct {
}

func NewResumeController() *ResumeController {
	return &ResumeController{}
}

// @title 获取简历
// @version 1.0
// @description 获取简历
// @produce json
// @router /resume [get]
// @param id path string true "id"
// @return json
// @securityDefinitions.basic BasicAuth
func (rc *ResumeController) GetResume(c *gin.Context) {
	resumeService := services.NewResumeService(lib.GetAppContext(c))
	id := c.Param("id")
	//id转为int
	idInt, _ := strconv.Atoi(id)
	resume, err := resumeService.GetResumesByUserID(uint(idInt))
	if err != nil {
		lib.ResponseFail(c, err.Error())
		return
	} else {
		lib.ResponseSuccess(c, "", resume)
	}
}

// @title 创建或更新简历
// @version 1.0
// @description 创建或更新简历
// @produce json
// @router /resume [post]
// @param id path string true "id"
// @return json
// @securityDefinitions.basic BasicAuth
// @param resume body models.Resume true "resume"
func (rc *ResumeController) CreateOrUpdateResume(c *gin.Context) {
	requestResume := &models.Resume{}
	appContext := lib.GetAppContext(c)
	user := appContext.GetUser()
	id := c.Param("id")
	idInt, _ := strconv.Atoi(id)

	if idInt != int(user.ID) {
		lib.ResponseFail(c, "参数错误")
		return
	}
	if bindErr := c.ShouldBindJSON(requestResume); bindErr != nil {
		lib.ResponseFail(c, "参数错误")
		return
	}
	resumeService := services.NewResumeService(appContext)
	requestResume.UserID = user.ID
	oldResume, _ := resumeService.GetResumesByUserID(user.ID)

	var oldResumeId uint = 0
	if oldResume != nil {
		oldResumeId = oldResume.ID
	}
	err := resumeService.CreateOrUpdateResume(oldResumeId, requestResume)
	if err != nil {
		lib.ResponseFail(c, err.Error())
		return
	} else {
		newResume, _ := resumeService.GetResumesByUserID(user.ID)
		lib.ResponseSuccess(c, "操作成功", newResume)
	}
}
