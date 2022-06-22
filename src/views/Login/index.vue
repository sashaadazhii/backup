<template>
  <div class="login__wrapper">
    <TheHeader />
    <div class="login__inner">
      <vue-lottie-player :key="lottieKey" name="loginAllowed" :animationData="animation" class="block__animation" style="height: 80px; width: 100%" />
      <div class="login__header">
        <div class="login__subtitle">You’re about to sign in to</div>
        <div class="login__title">Leroy’s Autocare</div>
      </div>
      <div class="login__main">
        <form class="block__wrapper" @submit.prevent="login">
          <label class="field__label">
            <div class="field__title">E-mail address</div>
            <input
              v-model.trim="email"
              type="text"
              class="field__input"
              :class="{success, error: v$.email.$error || error}"
              placeholder="Business Name"
              autocomplete="username"
            />
          </label>
          <label class="field__label">
            <div class="field__title">Password</div>
            <input
              v-model.trim="password"
              type="password"
              class="field__input"
              :class="{success, error: v$.password.$error || error}"
              placeholder="Password"
              autocomplete="current-password"
            />
          </label>
          <div class="block__footer">
            <div class="block__left">
              <i v-if="keepMe" class="i-toggle_on" @click="changeKeepMe" /><i v-else class="i-toggle_off" @click="changeKeepMe" />
              <span>Keep me signed in</span>
            </div>
            <div class="block__right"><span>Forgot password?</span></div>
          </div>
          <div class="block__rounded">
            <button class="block__lock" :class="{success, error: v$.$error || error}" type="submit">
              <i class="i-vpn_key" />
            </button>
          </div>
        </form>
      </div>
      <div class="login__footer">New to <span class="bold">autosoftware?</span> <span class="green">Register shop now</span></div>
    </div>
  </div>
</template>

<script>
import TheHeader from './Header'
import {mapActions, mapState, mapMutations} from 'vuex'
import useVuelidate from '@vuelidate/core'
import {required, email, minLength} from '@vuelidate/validators'
import VueLottiePlayer from 'vue-lottie-player'

export default {
  name: 'LoginPage',
  components: {TheHeader, VueLottiePlayer},
  data() {
    return {
      email: null,
      password: null,
      loginError: false,
      error: false,
      success: false,
      lottieKey: 0,
      errorAnimation: require('@/assets/animations/error.json'),
      successAnimation: require('@/assets/animations/success.json'),
      staticAnimation: require('@/assets/animations/static.json')
    }
  },
  computed: {
    ...mapState({
      keepMe: s => s.login.keepMe
    }),
    headerName() {
      return this.$route.meta.header
    },
    animation() {
      if (this.success) return this.successAnimation
      else if (this.error || this.v$.$error) return this.errorAnimation
      return this.staticAnimation
    }
  },
  watch: {
    animation() {
      this.lottieKey++
    }
  },

  methods: {
    ...mapMutations({
      changeKeepMe: 'login/changeKeepMe'
    }),
    ...mapActions({
      loginCustomer: 'login/loginCustomer',
      loginUser: 'login/loginUser'
    }),
    async login() {
      const result = await this.v$.$validate()
      if (!result) return
      const {email, password} = this
      try {
        if (this.headerName === 'loginUser') {
          await this.loginUser({login: email, password})
          this.error = false
          this.success = true
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        } else if (this.headerName === 'loginCustomer') {
          await this.loginCustomer({login: email, password})
          this.error = false
          this.success = true
          setTimeout(() => {
            this.$router.push('/company')
          }, 1000)
        }
      } catch (err) {
        if (err.response.status == 422) {
          this.error = true
        }
      }
    }
  },
  validations() {
    return {
      email: {required, email},
      password: {required, minLength: minLength(8)}
    }
  },
  setup: () => ({v$: useVuelidate()})
}
</script>

<style lang="scss" scoped>
@import 'style';
</style>
