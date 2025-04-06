<script setup lang="js">
import { CContainer, CCol, CCardGroup, CCard, CCardBody, CForm, CInputGroup, CInputGroupText, CFormInput, CRow,CButton, CImage } from '@coreui/vue';
import image from "@/assets/images/logo_unas.png"
import router from '../../router';
import { reactive } from 'vue';
import { useAuthStore } from '../../stores/auth';


const authStore = useAuthStore()
const formData = reactive({
  username : "",
  password : ""
})

async function handleSubmit() {
  if(!formData.username.trim() || !formData.password.trim()){
    alert("Please input form first!")
    return
  }
  try {
    const response = await authStore.login({username : formData.username, password : formData.password})
    if(response.status === 200){
      router.push("/")
    }
  } catch (error) {
    alert(error)
  }

}
</script>

<template>
  <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm class="align-middle" @submit.prevent="handleSubmit">
                  <h1>Login</h1>
                  <p class="text-body-secondary">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autocomplete="username"
                      v-model="formData.username"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      v-model="formData.password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton
                        type="submit"
                        color="primary"
                        class="px-4"
                        :disabled="authStore.loading"
                      >
                        <CSpinner
                          color="light"
                          class="text-sm"
                          size="sm"
                          v-show="authStore.loading"
                        />
                        <span> Login </span>
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard
              class="text-white bg-transparent py-5 d-flex justify-content-center align-content-center"
            >
              <CCardBody class="text-center d-flex justify-content-center align-content-center">
                <CImage fluid :src="image" style="width: 50%" />
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
