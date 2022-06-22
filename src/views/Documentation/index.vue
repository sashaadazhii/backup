<template>
  <section class="doc-section">
    <div class="menu">
      <div class="menu__item"><a href="#input">Input</a></div>
      <div class="menu__item"><a href="#button">Button</a></div>
      <div class="menu__item"><a href="#label">Label</a></div>
      <div class="menu__item"><a href="#dropdown">Dropdown</a></div>
      <div class="menu__item"><a href="#menu">Menu</a></div>
      <div class="menu__item"><a href="#filters">Filters</a></div>
    </div>
    <div class="container">
      <div id="input" class="doc-wrap">
        <div class="title">Inputs</div>
        <Api :api="apiInput" name="Input" />

        <Doc subtitle="#Default">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element">
                <Input v-model="userName" placeholder="Enter your name" title="Name" />
                <div>User name: {{ userName }}</div>
              </div>

              <div class="doc__element">
                <Input v-model="website" placeholder="Enter website" title="Website domain" rightText=".com" />
                <div>Website: {{ website }}</div>
              </div>
            </div>
          </template>
          <template #code>
            <div class="code__anim">
              <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Input</span><span class="code__blue"> v-model</span><span>="userName"</span><span class="code__blue"> placeholder</span><span>="Enter your name"</span><span class="code__blue"> title</span><span>="Name"</span><span  class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Input</span><span class="code__blue"> v-model</span><span>="website"</span><span class="code__blue"> placeholder</span><span>="Enter website"</span><span class="code__blue"> title</span><span>="Website domain"</span><span  class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>

<span class="code__arrow">&lt;</span><span class="code__red">script</span><span class="code__arrow">&gt;</span>
  <span class="code__purple"> export default</span>{
      <span class="code__orange">data</span>() {
        <span class="code__purple">return</span> {
          <span class="code__blue">userName</span>: null,
          <span class="code__blue">website</span>: null,
        }
      }
    }
<span class="code__arrow">&lt;/</span><span class="code__red">script</span><span class="code__arrow">&gt;</span>
</code>
            </pre>
            </div>
          </template>
        </Doc>

        <Doc subtitle="#Icons">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element">
                <Input v-model="userName" placeholder="Enter your name" iconLeft="i-person" />
              </div>
              <div class="doc__element">
                <Input v-model="userEmail" placeholder="Enter your email" iconRight="i-email" />
              </div>
              <div class="doc__element">
                <Input v-model="userPhone" placeholder="Enter ypur phone" iconLeft="i-phone" iconColor="your_icon_class" />
              </div>
            </div>
          </template>
          <template #code>
            <div class="code__anim">
              <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Input</span><span class="code__blue"> v-model</span><span>="userName"</span><span class="code__blue"> placeholder</span><span>="Enter your name"</span><span class="code__blue"> iconLeft</span><span>="i-person"</span><span  class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Input</span><span class="code__blue"> v-model</span><span>="userEmail"</span><span class="code__blue"> placeholder</span><span>="Enter your email"</span><span class="code__blue"> iconRight</span><span>="i-email"</span><span  class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Input</span><span class="code__blue"> v-model</span><span>="userPhone"</span><span class="code__blue"> placeholder</span><span>="Enter your phone"</span><span class="code__blue"> iconRight</span><span>="i-phone"</span>
         <span class="code__blue"> iconColor</span><span>="your_icon_class"</span><span  class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>

<span class="code__arrow">&lt;</span><span class="code__red">script</span><span class="code__arrow">&gt;</span>
  <span class="code__purple"> export default</span>{
      <span class="code__orange">data</span>() {
        <span class="code__purple">return</span> {
          <span class="code__blue">userName</span>: null,
          <span class="code__blue">userEmail</span>: null,
          <span class="code__blue">userPhone</span>: null
        }
      }
    }
<span class="code__arrow">&lt;/</span><span class="code__red">script</span><span class="code__arrow">&gt;</span>

<span class="code__arrow">&lt;</span><span class="code__red">style</span><span class="code__blue"> scoped</span><span class="code__arrow">&gt;</span>
   <span class="code__orange">.your_icon_class i</span> {
       <span class="code__blue">color</span>: orange;
   }
<span class="code__arrow">&lt;/</span><span class="code__red">style</span><span class="code__arrow">&gt;</span></code>
            </pre>
            </div>
          </template>
        </Doc>

        <Doc subtitle="#Errors">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element">
                <Input v-model="userName" placeholder="Enter your name" :error="isError" errorMessage="Your custom error message" />
              </div>
            </div>
          </template>
          <template #code>
            <div class="code__anim">
              <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Input</span><span class="code__blue"> v-model</span><span>="userName"</span><span class="code__blue"> placeholder</span><span>="Enter your name"</span> :<span class="code__blue"> error</span><span>="isError"</span>
        <span class="code__blue"> errorMessage</span><span>="Your custom error message"</span><span  class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>

<span class="code__arrow">&lt;</span><span class="code__red">script</span><span class="code__arrow">&gt;</span>
  <span class="code__purple"> export default</span>{
      <span class="code__orange">data</span>() {
        <span class="code__purple">return</span> {
          <span class="code__blue">userName</span>: null,
          <span class="code__blue">isError</span>: true,
        }
      }
    }
<span class="code__arrow">&lt;/</span><span class="code__red">script</span><span class="code__arrow">&gt;</span></code>
            </pre>
            </div>
          </template>
        </Doc>
        <Doc subtitle="#Updates">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element">
                <Input :modelValue="newPhone" placeholder="Enter your phone" @update:modelValue="setPhone" />
              </div>
            </div>
          </template>
          <template #code>
            <div class="code__anim">
              <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Input</span> :<span class="code__blue">modelValue</span><span>="newPhone"</span><span class="code__blue"> placeholder</span><span>="Enter your phone"</span>
          @<span class="code__blue">update</span>:<span class="code__blue">modelValue</span><span>="setPhone"</span><span class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>

<span class="code__arrow">&lt;</span><span class="code__red">script</span><span class="code__arrow">&gt;</span>
  <span class="code__purple"> export default</span>{
      <span class="code__orange">data</span>() {
        <span class="code__purple">return</span> {
          <span class="code__blue">newPhone</span>: null,
        }
      },
      <span class="code__blue">methods:</span> {
        <span class="code__orange">setPhone</span>() {
          <span class="code__green">// your code here...</span>
        }
      }
    }
<span class="code__arrow">&lt;/</span><span class="code__red">script</span><span class="code__arrow">&gt;</span></code>
            </pre>
            </div>
          </template>
        </Doc>
      </div>
      <div id="button" class="doc-wrap">
        <div class="title">Buttons</div>
        <Api :api="apiButton" name="Button" />

        <Doc subtitle="#Default">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element"><Button label="Save" /></div>
            </div>
          </template>
          <template #code>
            <div class="code__anim">
              <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Button</span><span class="code__blue"> label</span><span>="Save"</span><span  class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span></code>
            </pre>
            </div>
          </template>
        </Doc>

        <Doc subtitle="#Sizes">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element"><Button label="Submit" size="mini" /></div>
              <div class="doc__element"><Button label="Agree" size="small" /></div>
              <div class="doc__element"><Button label="Send" size="large" /></div>
              <div class="doc__element"><Button label="Confirm" size="huge" /></div>
            </div>
          </template>
          <template #code>
            <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Button</span><span class="code__blue"> label</span><span>="Submit"</span><span class="code__blue"> size</span><span>="mini"</span><span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Button</span><span class="code__blue"> label</span><span>="Agree"</span><span class="code__blue"> size</span><span>="small"</span><span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Button</span><span class="code__blue"> label</span><span>="Send"</span><span class="code__blue"> size</span><span>="large"</span><span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Button</span><span class="code__blue"> label</span><span>="Confirm"</span><span class="code__blue"> size</span><span>="huge"</span><span class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span></code>
            </pre>
          </template>
        </Doc>

        <Doc subtitle="#Types">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element"><Button label="Submit" circle /></div>
              <div class="doc__element"><Button label="Submit" border /></div>
              <div class="doc__element"><Button label="Submit" grey /></div>
              <div class="doc__element"><Button label="Submit" circle grey /></div>
            </div>
          </template>
          <template #code>
            <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Button</span><span class="code__blue"> label</span><span>="Submit"</span> <span class="code__blue">circle</span><span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Button</span><span class="code__blue"> label</span><span>="Submit"</span> <span class="code__blue">border</span><span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Button</span><span class="code__blue"> label</span><span>="Submit"</span> <span class="code__blue">grey</span><span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Button</span><span class="code__blue"> label</span><span>="Submit"</span> <span class="code__blue">circle grey</span><span class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span></code>
            </pre>
          </template>
        </Doc>

        <Doc subtitle="#Loading">
          <template #elements>
            <div class="doc__element"><Button label="Send" size="small" :loading="isLoading" @click="toggle" /></div>
            <div class="doc__element">
              <Button label="Submit" size="large" :loading="isLoading2" loadingIcon="i-autorenew y-spin" border />
            </div>
            <div class="doc__element">
              <Button label="Submit" size="huge" :loading="isLoading2" loadingIcon="i-autorenew y-spin" />
            </div>
          </template>
          <template #code>
            <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Button</span><span class="code__blue"> label</span><span>="Submit"</span> <span class="code__blue">:loading</span>="isLoading" @<span class="code__blue">click</span>="<span class="code__orange">toggle</span>"<span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Button</span><span class="code__blue"> label</span><span>="Submit"</span> <span class="code__blue">:loading</span>="isLoading" <span class="code__blue">loadingIcon</span>="i-autorenew y-spin" <span class="code__blue">border</span><span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Button</span><span class="code__blue"> label</span><span>="Submit"</span> <span class="code__blue">:loading</span>="isLoading" <span class="code__blue">loadingIcon</span>="i-autorenew "<span class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>

<span class="code__arrow">&lt;</span><span class="code__red">script</span><span class="code__arrow">&gt;</span>
  <span class="code__purple"> export default</span>{
      <span class="code__orange">data</span>() {
        <span class="code__purple">return</span> {
          <span class="code__blue">isLoading</span>: false,
        }
      },
      <span class="code__blue">methods:</span> {
        <span class="code__orange">toggle</span>() {
          this.<span class="code__blue">isLoading</span> = <span class="code__blue">true</span>
        }
      }
    }
<span class="code__arrow">&lt;/</span><span class="code__red">script</span><span class="code__arrow">&gt;</span>


</code>
            </pre>
          </template>
        </Doc>

        <Doc subtitle="#Icons">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element"><Button label="Send" icon="i-phone" /></div>
              <div class="doc__element"><Button label="Login" icon="i-person" iconPos="left" /></div>
              <div class="doc__element"><Button label="Submit" icon="i-email" iconPos="right" /></div>
            </div>
          </template>
          <template #code>
            <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Button</span><span class="code__blue"> label</span><span>="Send"</span> <span class="code__blue">icon</span>="i-phone"<span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Button</span><span class="code__blue"> label</span><span>="Login"</span> <span class="code__blue">icon</span>="i-person" <span class="code__blue">iconPos</span>="left"<span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Button</span><span class="code__blue"> label</span><span>="Submit"</span> <span class="code__blue">icon</span>="i-email" <span class="code__blue">iconPos</span>="right"<span class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span></code>
            </pre>
          </template>
        </Doc>
      </div>
      <div id="label" class="doc-wrap">
        <div class="title">Label</div>

        <Api :api="apiLabel" name="Link" />

        <Doc subtitle="#Default">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element"><Label alias="MN" size="mini" /></div>
              <div class="doc__element"><Label alias="MN" size="mini" /></div>
              <div class="doc__element"><Label alias="MN" size="small" /></div>
              <div class="doc__element"><Label alias="MN" size="large" /></div>
              <div class="doc__element"><Label alias="MN" size="huge" /></div>
            </div>
            <div class="doc__elements">
              <div class="doc__element"><Label label="active" size="mini" /></div>
              <div class="doc__element"><Label label="active" size="small" /></div>
              <div class="doc__element"><Label label="active" size="large" /></div>
              <div class="doc__element"><Label label="active" size="huge" /></div>
            </div>
          </template>
          <template #code>
            <div class="code__anim">
              <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> alias</span><span>="MN"</span><span class="code__blue"> size</span><span>="mini"</span><span  class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> alias</span><span>="MN"</span><span class="code__blue"> size</span><span>="small"</span><span  class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> alias</span><span>="MN"</span><span class="code__blue"> size</span><span>="large"</span><span  class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> alias</span><span>="MN"</span><span class="code__blue"> size</span><span>="huge"</span><span  class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> label</span><span>="active"</span><span class="code__blue"> size</span><span>="mini"</span><span  class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> label</span><span>="active"</span><span class="code__blue"> size</span><span>="small"</span><span  class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> label</span><span>="active"</span><span class="code__blue"> size</span><span>="large"</span><span  class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> label</span><span>="active"</span><span class="code__blue"> size</span><span>="huge"</span><span  class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
</code>
            </pre>
            </div>
          </template>
        </Doc>

        <Doc subtitle="#Types">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element"><Label alias="CL" size="mini" circle /></div>
              <div class="doc__element"><Label alias="CL" size="small" circle /></div>
              <div class="doc__element"><Label alias="CL" size="large" circle /></div>
              <div class="doc__element"><Label alias="CL" size="huge" circle /></div>
            </div>
            <div class="doc__elements">
              <div class="doc__element"><Label alias="BF" size="mini" border /></div>
              <div class="doc__element"><Label alias="BF" size="small" border /></div>
              <div class="doc__element"><Label alias="BF" size="large" border /></div>
              <div class="doc__element"><Label alias="BF" size="huge" border /></div>
            </div>
          </template>
          <template #code>
            <div class="code__anim">
              <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> alias</span><span>="CL"</span><span class="code__blue"> size</span><span>="mini"</span><span class="code__blue"> circle</span><span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> alias</span><span>="CL"</span><span class="code__blue"> size</span><span>="small"</span><span class="code__blue"> circle</span><span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> alias</span><span>="CL"</span><span class="code__blue"> size</span><span>="large"</span><span class="code__blue"> circle</span><span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> alias</span><span>="CL"</span><span class="code__blue"> size</span><span>="huge"</span><span class="code__blue"> circle</span><span class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> alias</span><span>="BF"</span><span class="code__blue"> size</span><span>="mini"</span><span class="code__blue"> border</span><span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> alias</span><span>="BF"</span><span class="code__blue"> size</span><span>="small"</span><span class="code__blue"> border</span><span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> alias</span><span>="BF"</span><span class="code__blue"> size</span><span>="large"</span><span class="code__blue"> border</span><span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> alias</span><span>="BF"</span><span class="code__blue"> size</span><span>="huge"</span><span class="code__blue"> border</span><span class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span></code>
            </pre>
            </div>
          </template>
        </Doc>

        <Doc subtitle="#Icons">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element"><Label icon="i-calendar_stroke" /></div>
              <div class="doc__element"><Label icon="i-calendar_stroke" color="#bd665b" size="mini" /></div>
            </div>
            <div class="doc__elements">
              <div class="doc__element"><Label icon="i-build" color="#5b80bd" circle /></div>
              <div class="doc__element"><Label icon="i-build" size="large" color="#5b80bd" circle /></div>
            </div>
            <div class="doc__elements">
              <div class="doc__element"><Label label="User" icon="i-person" size="small" circle /></div>
              <div class="doc__element"><Label label="Email" icon="i-email" size="small" circle border /></div>
            </div>
            <div class="doc__elements">
              <div class="doc__element"><Label label="Phone" icon="i-phone" size="mini" /></div>
              <div class="doc__element"><Label label="user" icon="i-lock" size="mini" border /></div>
            </div>
            <div class="doc__elements">
              <div class="doc__element"><Label label="user" icon="i-user" color="#F9B507" circle /></div>
            </div>
          </template>
          <template #code>
            <div class="code__anim">
              <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> icon</span><span>="i-calendar_stroke"</span><span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> icon</span><span>="i-calendar_stroke"</span><span class="code__blue"> color</span><span>="#bd665b"</span><span class="code__blue"> size</span><span>="mini"</span><span class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> icon</span><span>="i-build"</span><span class="code__blue"> color</span><span>="#5b80bd"</span><span class="code__blue"> circle</span><span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> icon</span><span>="i-build"</span><span class="code__blue"> color</span><span>="#5b80bd"</span><span class="code__blue"> size</span><span>="large"</span><span class="code__blue"> circle</span><span class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>  
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> label</span><span>="User"</span><span class="code__blue"> icon</span><span>="i-person"</span><span class="code__blue"> size</span><span>="small"</span><span class="code__blue"> circle</span><span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> label</span><span>="Email"</span><span class="code__blue"> icon</span><span>="i-email"</span><span class="code__blue"> size</span><span>="small"</span><span class="code__blue"> circle border</span><span class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>  
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> label</span><span>="Phone"</span><span class="code__blue"> icon</span><span>="i-phone"</span><span class="code__blue"> size</span><span>="mini"</span><span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> label</span><span>="user"</span><span class="code__blue"> icon</span><span>="i-lock"</span><span class="code__blue"> size</span><span>="mini"</span><span class="code__blue"> border</span><span class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span  class="code__red">Label</span><span class="code__blue"> label</span><span>="user"</span><span class="code__blue"> icon</span><span>="i-person"</span><span class="code__blue"> color</span><span>="#F9B507"</span><span class="code__blue"> circle</span><span class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
</code>
            </pre>
            </div>
          </template>
        </Doc>
      </div>
      <div id="dropdown" class="doc-wrap">
        <div class="title">Dropdown</div>

        <Api :api="apiDropdown" name="Dropdown" />

        <Doc subtitle="#Default">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element">
                <Dropdown v-model="country" :options="countries" placeholder="Choose your country" title="Countries list" />
              </div>
            </div>
            <div class="doc__elements">
              <div class="doc__element">
                <Dropdown v-model="car" :options="cars" placeholder="Choose your car" optionLabel="title" title="No icons" />
              </div>
            </div>
            <div class="doc__elements">
              <div class="doc__element">
                <Dropdown v-model="role" :options="roles" title="List with icons">
                  <template #value="{value}">
                    <div>
                      <i v-if="value.title === 'director'" class="i-user" />
                      <i v-if="value.title === 'manager'" class="i-article_menu" />
                      <i v-if="value.title === 'technician'" class="i-build" />
                      <i v-if="value.title === 'art director'" class="i-person" />
                      <span>{{ value.title }}</span>
                    </div>
                  </template>
                  <template #option="{option}">
                    <div class="main__dropdown-label">
                      <i v-if="option.title === 'director'" class="i-user" />
                      <i v-if="option.title === 'manager'" class="i-article_menu" />
                      <i v-if="option.title === 'technician'" class="i-build" />
                      <i v-if="option.title === 'art director'" class="i-person" />
                      <span>{{ option.title }}</span>
                    </div>
                  </template>
                </Dropdown>
              </div>
            </div>
          </template>
          <template #code>
            <div class="code__anim">
              <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Dropdown</span><span class="code__blue"> v-model</span><span>="country"</span> :<span class="code__blue">options</span><span>="countries"</span><span class="code__blue"> placeholder</span>="Choose your country"
             <span class="code__blue">title</span><span>="Countries list"</span><span class="code__arrow"> /&gt;</span>

    <span class="code__arrow">&lt;</span><span class="code__red">Dropdown</span><span class="code__blue"> v-model</span><span>="car"</span> :<span class="code__blue">options</span><span>="cars"</span><span class="code__blue"> placeholder</span>="Choose your car"
             <span class="code__blue">title</span><span>="No icons"</span><span class="code__blue"> optionLabel</span><span>="title"</span><span class="code__arrow"> /&gt;</span>

   <span class="code__arrow">&lt;</span><span class="code__red">Dropdown</span><span class="code__blue"> v-model</span><span>="role"</span> :<span class="code__blue">options</span><span>="roles"</span><span class="code__blue"> title</span><span>="List with icons"</span><span class="code__arrow">&gt;</span>
      <span class="code__arrow">&lt;</span><span class="code__red">template</span> #<span class="code__blue">value</span>="{<span class="code__blue">value</span>}"<span class="code__arrow">&gt;</span>
          <span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__blue"> class</span>="your_class_if_needed"<span class="code__arrow">&gt;</span>
              <span class="code__arrow">&lt;</span><span class="code__red">i</span><span class="code__arrow"><span class="code__blue"> v-if</span>="<span class="code__blue">value.title</span> === 'director'" <span class="code__blue">class</span>="i-user" /&gt;</span>
              <span class="code__arrow">&lt;</span><span class="code__red">i</span><span class="code__arrow"><span class="code__blue"> v-if</span>="<span class="code__blue">value.title</span> === 'manager'" <span class="code__blue">class</span>="i-article_menu" /&gt;</span>
              <span class="code__arrow">&lt;</span><span class="code__red">i</span><span class="code__arrow"><span class="code__blue"> v-if</span>="<span class="code__blue">value.title</span> === 'technician'" <span class="code__blue">class</span>="i-build" /&gt;</span>
              <span class="code__arrow">&lt;</span><span class="code__red">i</span><span class="code__arrow"><span class="code__blue"> v-if</span>="<span class="code__blue">value.title</span> === 'art director'" <span class="code__blue">class</span>="i-person /&gt;</span>
              <span class="code__arrow">&lt;</span><span class="code__red">span</span><span class="code__arrow">&gt;</span>&#123;&#123; value.title &#125;&#125;<span class="code__arrow">&lt;/</span><span class="code__red">span</span><span class="code__arrow">&gt;</span>
         <span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
      <span class="code__arrow">&lt;/</span><span class="code__red">template</span><span class="code__arrow">&gt;</span>
      <span class="code__arrow">&lt;</span><span class="code__red">template</span> #<span class="code__blue">option</span>="{<span class="code__blue">option</span>}"<span class="code__arrow">&gt;</span>
        <span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__blue"> class</span>="your_class_if_needed"<span class="code__arrow">&gt;</span>
            <span class="code__arrow">&lt;</span><span class="code__red">i</span><span class="code__arrow"><span class="code__blue"> v-if</span>="<span class="code__blue">option.title</span> === 'director'" <span class="code__blue">class</span>="i-user" /&gt;</span>
            <span class="code__arrow">&lt;</span><span class="code__red">i</span><span class="code__arrow"><span class="code__blue"> v-if</span>="<span class="code__blue">option.title</span> === 'manager'" <span class="code__blue">class</span>="i-article_menu" /&gt;</span>
            <span class="code__arrow">&lt;</span><span class="code__red">i</span><span class="code__arrow"><span class="code__blue"> v-if</span>="<span class="code__blue">option.title</span> === 'technician'" <span class="code__blue">class</span>="i-build" /&gt;</span>
            <span class="code__arrow">&lt;</span><span class="code__red">i</span><span class="code__arrow"><span class="code__blue"> v-if</span>="<span class="code__blue">option.title</span> === 'art director'" <span class="code__blue">class</span>="i-person" /&gt;</span>
            <span class="code__arrow">&lt;</span><span class="code__red">span</span><span class="code__arrow">&gt;</span>&#123;&#123; option.title &#125;&#125;<span class="code__arrow">&lt;/</span><span class="code__red">span</span><span class="code__arrow">&gt;</span>
        <span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
     <span class="code__arrow">&lt;/</span><span class="code__red">template</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;/</span><span class="code__red">Dropdown</span><span class="code__arrow">&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>

<span class="code__arrow">&lt;</span><span class="code__red">script</span><span class="code__arrow">&gt;</span>
  <span class="code__purple"> export default</span>{
      <span class="code__orange">data</span>() {
        <span class="code__purple">return</span> {
          <span class="code__blue">country</span>: '',
          <span class="code__blue">countries</span>: ['Ukraine', 'Canada', 'Austarlia', 'New Zeland'],
          <span class="code__blue">role</span>: {title: 'director',label: 'dr', id: '09'},
          <span class="code__blue">roles</span>: [
            {title: 'director', label: 'dr', id: '09'},
             {title: 'manager', label: 'mn', id: '03'},
             {title: 'technician', label: 'tc', id: '07'},
             {title: 'art director', label: 'ad', id: '02'}
          ],
          <span class="code__blue">car</span>: {title: 'Seat', label: 'st', id: '4'},
          <span class="code__blue">cars</span>: [
            {title: 'Volvo', label: 'vo', id: '1'},
            {title: 'Audi', label: 'au', id: '2'},
            {title: 'Kia', label: 'ki', id: '3'},
            {title: 'Seat', label: 'st', id: '4'}
          ],
        }
      }
    }
<span class="code__arrow">&lt;/</span><span class="code__red">script</span><span class="code__arrow">&gt;</span></code>
            </pre>
            </div>
          </template>
        </Doc>

        <Doc subtitle="#Events">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element">
                <Dropdown :modelValue="chosen" :options="roles" placeholder="Roles" optionLabel="title" @change="select" />
              </div>
              <div class="doc__res">Your choise: {{ chosen }}</div>
            </div>
          </template>
          <template #code>
            <div class="code__anim">
              <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Dropdown</span> :<span class="code__blue">modelValue</span><span>="chosen"</span> :<span class="code__blue">options</span><span>="roles"</span><span class="code__blue"> placeholder</span>="Choose your country"
             <span class="code__blue">optionLabel</span><span>="title"</span> @<span class="code__blue">change</span><span>="select"</span><span class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>

<span class="code__arrow">&lt;</span><span class="code__red">script</span><span class="code__arrow">&gt;</span>
  <span class="code__purple"> export default</span>{
      <span class="code__orange">data</span>() {
        <span class="code__purple">return</span> {
          <span class="code__blue">chosen</span>: '',
          <span class="code__blue">roles</span>: [
            {title: 'director', label: 'dr', id: '09'},
             {title: 'manager', label: 'mn', id: '03'},
             {title: 'technician', label: 'tc', id: '07'},
             {title: 'art director', label: 'ad', id: '02'}
          ]
        }
      },
      <span class="code__blue">methods:</span> {
        <span class="code__orange">select</span>() {
          this.<span class="code__blue">chosen</span> = <span class="code__blue">e.value</span>
        }
      }
    }
<span class="code__arrow">&lt;/</span><span class="code__red">script</span><span class="code__arrow">&gt;</span></code>
            </pre>
            </div>
          </template>
        </Doc>

        <Doc subtitle="#Search">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element">
                <Dropdown :options="roles" optionLabel="title" search searchPlaceholder="Choose role" emptySearchMessage="No items">
                  <template #emptysearch />
                </Dropdown>
              </div>
              <div class="doc__element">
                <Dropdown :options="customers" optionLabel="name" search async searchPlaceholder="Async search" @asyncSearch="search"> </Dropdown>
              </div>
            </div>
          </template>
          <template #code>
            <div class="code__anim">
              <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Dropdown</span> :<span class="code__blue">options</span><span>="roles"</span><span class="code__blue"> optionLabel</span><span>="title"</span><span class="code__blue"> searchPlaceholder</span>="Choose role"
             <span class="code__blue">emptySearchMessage</span><span>="No items"</span><span class="code__arrow">&gt;</span>
      <span class="code__arrow">&lt;</span><span class="code__red">template</span> #<span class="code__blue">emptysearch</span><span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;/</span><span class="code__red">Dropdown</span><span class="code__arrow">&gt;</span>

   <span class="code__arrow">&lt;</span><span class="code__red">Dropdown</span> :<span class="code__blue">options</span><span>="customers"</span><span class="code__blue"> optionLabel</span><span>="name"</span><span class="code__blue"> searchPlaceholder</span>="Choose role"
             <span class="code__blue"> search async</span> @<span class="code__blue">asyncSearch</span>="search"<span class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>

<span class="code__arrow">&lt;</span><span class="code__red">script</span><span class="code__arrow">&gt;</span>
  <span class="code__purple"> export default</span>{
      <span class="code__orange">data</span>() {
        <span class="code__purple">return</span> {
          <span class="code__blue">roles</span>: [
            {title: 'director', label: 'dr', id: '09'},
            {title: 'manager', label: 'mn', id: '03'},
            {title: 'technician', label: 'tc', id: '07'},
            {title: 'art director', label: 'ad', id: '02'}
          ],
          <span class="code__blue">customers</span>: [],
        }
      },
      <span class="code__blue">methods:</span> {
        <span class="code__purple">async </span><span class="code__orange">search</span>({query}) {
          const <span class="code__navy">customers</span> = <span class="code__purple">await</span> this.<span class="code__orange">searchCustomers</span>({<span class="code__blue">search</span>: query})
          this.<span class="code__blue">customers</span> = <span class="code__blue">customers</span>.<span class="code__blue">data</span>.<span class="code__blue">data</span>.<span class="code__orange">map</span>(<span class="code__blue">c</span> => {
            <span class="code__blue">c</span>.<span class="code__blue">name</span> = `${<span class="code__blue">c</span>.<span class="code__blue">firstName</span>} ${<span class="code__blue">c</span>.<span class="code__blue">lastName</span>}`
            <span class="code__purple">return</span><span class="code__blue"> c</span>
          })
        }
      }
    }
<span class="code__arrow">&lt;/</span><span class="code__red">script</span><span class="code__arrow">&gt;</span></code>
            </pre>
            </div>
          </template>
        </Doc>

        <Doc subtitle="#Styling">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element">
                <Dropdown :options="countries" v-model="country" placeholder="Select your country" scrollHeight="120px" openPosition="right" />
              </div>
              <div class="doc__element">
                <Dropdown :options="countries" v-model="country" placeholder="Choose your country" panelClass="colored" />
              </div>
            </div>
          </template>
          <template #code>
            <div class="code__anim">
              <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Dropdown</span><span class="code__blue"> v-model</span><span>="country"</span> :<span class="code__blue">options</span><span>="countries"</span><span class="code__blue"> placeholder</span>="Select your country"
             <span class="code__blue"> scrollHeight</span><span>="120px"</span><span class="code__blue"> openPosition</span><span>="right"</span><span class="code__arrow"> /&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Dropdown</span><span class="code__blue"> v-model</span><span>="country"</span> :<span class="code__blue">options</span><span>="countries"</span><span class="code__blue"> placeholder</span>="Choose your country"
             <span class="code__blue"> panelClass</span><span>="colored"</span><span class="code__arrow"> /&gt;</span>          
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>

<span class="code__arrow">&lt;</span><span class="code__red">script</span><span class="code__arrow">&gt;</span>
  <span class="code__purple"> export default</span>{
      <span class="code__orange">data</span>() {
        <span class="code__purple">return</span> {
          <span class="code__blue">country</span>: '',
          <span class="code__blue">countries</span>: ['Ukraine', 'Canada', 'Austarlia', 'New Zeland']
        }
      }
    }
<span class="code__arrow">&lt;/</span><span class="code__red">script</span><span class="code__arrow">&gt;</span>

<span class="code__green">// remove scoped from your style tag</span>
<span class="code__arrow">&lt;</span><span class="code__red">style</span><span class="code__arrow">&gt;</span>
   <span class="code__orange">.y-dropdown-panel.colored</span> {
       <span class="code__blue">background-color</span>: lightyellow;
   }

   <span class="code__green">// OR use <span class="code__navy">!important</span></span>
   <span class="code__orange">.colored</span> {
       <span class="code__blue">background-color</span>: lightyellow <span class="code__navy">!important</span>;
   }
<span class="code__arrow">&lt;/</span><span class="code__red">style</span><span class="code__arrow">&gt;</span></code>
            </pre>
            </div>
          </template>
        </Doc>

        <Doc subtitle="#Errors">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element">
                <Dropdown :options="countries" v-model="country" placeholder="Choose your country" :error="error" errorMessage="Country is required." />
              </div>
            </div>
          </template>
          <template #code>
            <div class="code__anim">
              <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Dropdown</span><span class="code__blue"> v-model</span><span>="country"</span> :<span class="code__blue">options</span><span>="countries"</span><span class="code__blue"> placeholder</span>="Select your country"
             :<span class="code__blue">error</span><span>="error"</span><span class="code__blue"> errorMessage</span><span>="Country is required."</span><span class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>

<span class="code__arrow">&lt;</span><span class="code__red">script</span><span class="code__arrow">&gt;</span>
  <span class="code__purple"> export default</span>{
      <span class="code__orange">data</span>() {
        <span class="code__purple">return</span> {
          <span class="code__blue">country</span>: '',
          <span class="code__blue">error</span>: true,
          <span class="code__blue">countries</span>: ['Ukraine', 'Canada', 'Austarlia', 'New Zeland']
        }
      }
    }
<span class="code__arrow">&lt;/</span><span class="code__red">script</span><span class="code__arrow">&gt;</span></code>
            </pre>
            </div>
          </template>
        </Doc>

        <Doc subtitle="#Filters">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element">
                <div class="doc__element">
                  <Dropdown v-model="role" :options="roles" optionLabel="title" filter filterPlaceholder="Search role" placeholder="Select role" />
                </div>
              </div>
            </div>
          </template>
          <template #code>
            <div class="code__anim">
              <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Dropdown</span><span class="code__blue"> v-model</span><span>="role"</span> :<span class="code__blue">options</span><span>="roles"</span><span class="code__blue"> placeholder</span>="Select role"
             <span class="code__blue">filter filterPlaceholder</span><span>="Search role"</span><span class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>

<span class="code__arrow">&lt;</span><span class="code__red">script</span><span class="code__arrow">&gt;</span>
  <span class="code__purple"> export default</span>{
      <span class="code__orange">data</span>() {
        <span class="code__purple">return</span> {
           <span class="code__blue">role</span>: {title: 'director', label: 'dr', id: '09'},
           <span class="code__blue">roles</span>: [
             {title: 'director', label: 'dr', id: '09'},
             {title: 'manager', label: 'mn', id: '03'},
             {title: 'technician', label: 'tc', id: '07'},
             {title: 'art director', label: 'ad', id: '02'}
           ]
         }
      }
    }
<span class="code__arrow">&lt;/</span><span class="code__red">script</span><span class="code__arrow">&gt;</span></code>
            </pre>
            </div>
          </template>
        </Doc>
      </div>
      <div id="menu" class="doc-wrap">
        <div class="title">Menu</div>

        <Api :api="apiMenu" name="Menu" />

        <Doc subtitle="#Default">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element">
                <Menu :list="actions" />
              </div>
              <div class="doc__element">
                <Menu :list="actions">
                  <template #menu>
                    <span>Settings <i class="i-settings" /></span>
                  </template>
                </Menu>
              </div>
            </div>
          </template>
          <template #code>
            <div class="code__anim">
              <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Menu</span> :<span class="code__blue">list</span><span>="actions"</span><span class="code__arrow"> /&gt;</span>
   
   <span class="code__arrow">&lt;</span><span class="code__red">Menu</span> :<span class="code__blue">list</span><span>="actions"</span><span class="code__arrow">&gt;</span>
         <span class="code__arrow">&lt;</span><span class="code__red">template</span> #<span class="code__blue">menu</span><span class="code__arrow"> /&gt;</span>
            <span class="code__arrow">&lt;</span><span class="code__red">span</span><span class="code__arrow">&gt;</span>Settings <span class="code__arrow">&lt;</span><span class="code__red">i</span><span class="code__arrow"><span class="code__blue"> class</span>="i-settings" /&gt;</span><span class="code__arrow"></span> <span class="code__arrow">&lt;/</span><span class="code__red">span</span><span class="code__arrow">&gt;</span>
         <span class="code__arrow">&lt;/</span><span class="code__red">template</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;/</span><span class="code__red">Menu</span><span class="code__arrow">&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>

<span class="code__arrow">&lt;</span><span class="code__red">script</span><span class="code__arrow">&gt;</span>
  <span class="code__purple"> export default</span>{
      <span class="code__orange">data</span>() {
        <span class="code__purple">return</span> {
           <span class="code__blue">actions</span>: [
            {
              label: 'Edit',
              icon: 'i-edit',
              <span class="code__orange">command</span> () => {
                <span class="code__orange">alert</span>('Edit action')
              }
            },
            {
              label: 'Remove',
              icon: 'i-remove_circle red',
              <span class="code__orange">command</span> () => {
                <span class="code__orange">alert</span>('Remove action')
              }
            }
           ]
         }
      }
    }
<span class="code__arrow">&lt;/</span><span class="code__red">script</span><span class="code__arrow">&gt;</span></code>
            </pre>
            </div>
          </template>
        </Doc>

        <Doc subtitle="#Styles">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element static">
                <Menu :list="actions" position="left" />
              </div>
            </div>
          </template>
          <template #code>
            <div class="code__anim">
              <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Menu</span> :<span class="code__blue">list</span><span>="actions"</span><span class="code__blue">position</span>="left"<span class="code__arrow"> /&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>

<span class="code__arrow">&lt;</span><span class="code__red">script</span><span class="code__arrow">&gt;</span>
  <span class="code__purple"> export default</span>{
      <span class="code__orange">data</span>() {
        <span class="code__purple">return</span> {
           <span class="code__blue">actions</span>: [
            {
              label: 'Edit',
              icon: 'i-edit',
              <span class="code__orange">command</span> () => {
                <span class="code__orange">alert</span>('Edit action')
              }
            },
            {
              label: 'Remove',
              icon: 'i-remove_circle red',
              <span class="code__orange">command</span> () => {
                <span class="code__orange">alert</span>('Remove action')
              }
            }
           ]
         }
      }
    }
<span class="code__arrow">&lt;/</span><span class="code__red">script</span><span class="code__arrow">&gt;</span></code>
            </pre>
            </div>
          </template>
        </Doc>
      </div>
      <div id="filters" class="doc-wrap">
        <div class="title">Filters</div>

        <Api :api="apiFilters" name="Filters" />
        <Doc subtitle="#Default">
          <template #elements>
            <div class="doc__elements">
              <div class="doc__element">
                <Filter />
              </div>
              <div class="doc__element"></div>
            </div>
          </template>
          <template #code>
            <div class="code__anim">
              <pre class="doc__code"><code class="code">
<span class="code__arrow">&lt;</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;</span><span class="code__red">Menu</span> :<span class="code__blue">list</span><span>="actions"</span><span class="code__arrow"> /&gt;</span>
   
   <span class="code__arrow">&lt;</span><span class="code__red">Menu</span> :<span class="code__blue">list</span><span>="actions"</span><span class="code__arrow">&gt;</span>
         <span class="code__arrow">&lt;</span><span class="code__red">template</span> #<span class="code__blue">menu</span><span class="code__arrow"> /&gt;</span>
            <span class="code__arrow">&lt;</span><span class="code__red">span</span><span class="code__arrow">&gt;</span>Settings <span class="code__arrow">&lt;</span><span class="code__red">i</span><span class="code__arrow"><span class="code__blue"> class</span>="i-settings" /&gt;</span><span class="code__arrow"></span> <span class="code__arrow">&lt;/</span><span class="code__red">span</span><span class="code__arrow">&gt;</span>
         <span class="code__arrow">&lt;/</span><span class="code__red">template</span><span class="code__arrow">&gt;</span>
   <span class="code__arrow">&lt;/</span><span class="code__red">Menu</span><span class="code__arrow">&gt;</span>
<span class="code__arrow">&lt;/</span><span class="code__red">div</span><span class="code__arrow">&gt;</span>

<span class="code__arrow">&lt;</span><span class="code__red">script</span><span class="code__arrow">&gt;</span>
  <span class="code__purple"> export default</span>{
      <span class="code__orange">data</span>() {
        <span class="code__purple">return</span> {
           <span class="code__blue">actions</span>: [
            {
              label: 'Edit',
              icon: 'i-edit',
              <span class="code__orange">command</span> () => {
                <span class="code__orange">alert</span>('Edit action')
              }
            },
            {
              label: 'Remove',
              icon: 'i-remove_circle red',
              <span class="code__orange">command</span> () => {
                <span class="code__orange">alert</span>('Remove action')
              }
            }
           ]
         }
      }
    }
<span class="code__arrow">&lt;/</span><span class="code__red">script</span><span class="code__arrow">&gt;</span></code>
            </pre>
            </div>
          </template>
        </Doc>
      </div>
    </div>
  </section>
</template>
<script>
import Button from '@/components/Yaro/Button'
import Label from '@/components/Yaro/Label'
import Dropdown from '@/components/Yaro/Dropdown'
import Input from '@/components/Yaro/Input'
import Menu from '@/components/Yaro/Menu'
import Filter from '@/components/Yaro/Filter'
import Doc from './Doc'
import Api from './TheApi'
import {mapActions} from 'vuex'

export default {
  name: 'Documentation',
  components: {Api, Button, Label, Input, Filter, Doc, Dropdown, Menu},
  data() {
    return {
      isLoading: false,
      isLoading2: false,
      isVisible: false,
      canCopy: false,
      isError: true,
      chosen: '',
      error: true,
      roles: [
        {title: 'director', label: 'dr', id: '09'},
        {title: 'manager', label: 'mn', id: '03'},
        {title: 'technician', label: 'tc', id: '07'},
        {title: 'art director', label: 'ad', id: '02'}
      ],
      cars: [
        {title: 'Volvo', label: 'vo', id: '1'},
        {title: 'Audi', label: 'au', id: '2'},
        {title: 'Kia', label: 'ki', id: '3'},
        {title: 'Seat', label: 'st', id: '4'}
      ],
      car: {title: 'Seat', label: 'st', id: '4'},
      role: {title: 'director', label: 'dr', id: '09'},
      countries: ['Ukraine', 'Canada', 'Austarlia', 'New Zeland'],
      country: '',
      customers: [],
      userName: null,
      userEmail: null,
      userPhone: null,
      website: null,
      newPhone: null,
      actions: [
        {
          label: 'Edit',
          icon: 'i-edit',
          command: () => {
            alert('Edit action')
          }
        },
        {
          label: 'Remove',
          icon: 'i-remove_circle red',
          command: () => {
            alert('Remove action')
          }
        }
      ],
      apiInput: {
        apiProps: [
          {name: 'modelValue', type: 'String, Number', default: "''"},
          {name: 'modelModifiers', type: 'Object', default: '() => ({})'},
          {name: 'placeholder', type: 'String', default: "''"},
          {name: 'title', type: 'String', default: "''"},
          {name: 'iconLeft', type: 'String', default: 'null'},
          {name: 'iconRight', type: 'String', default: 'null'},
          {name: 'iconColor', type: 'String', default: 'null'},
          {name: 'rightText', type: 'String', default: 'null'},
          {name: 'error', type: 'Boolen', default: 'false'},
          {name: 'errorMessage', type: 'String', default: 'null'}
        ],
        apiEmits: ['update: modelValue']
      },
      apiButton: {
        apiProps: [
          {name: 'label', type: 'String', default: 'none'},
          {name: 'size', type: 'String', default: 'none; [mini, small, large, huge]'},
          {name: 'icon', type: 'String', default: ''},
          {name: 'iconPos', type: 'String', default: 'left'},
          {name: 'loading', type: 'Boolen', default: 'false'},
          {name: 'loadingIcon', type: 'String', default: 'i-loading y-spin'},
          {name: 'disabled', type: 'Boolen [attr]', default: 'false'},
          {name: 'circle', type: 'Boolen [attr]', default: ''},
          {name: 'border', type: 'Boolen [attr]', default: ''},
          {name: 'red', type: 'Boolen [attr]', default: ''},
          {name: 'grey', type: 'Boolen [attr]', default: ''}
        ],
        apiEmits: []
      },
      apiLabel: {
        apiProps: [
          {name: 'label', type: 'String', default: 'none'},
          {name: 'size', type: 'String', default: 'none; [mini, small, large, huge]'},
          {name: 'icon', type: 'String', default: 'none'},
          {name: 'alias', type: 'String', default: 'none'},
          {name: 'circle', type: 'Boolen [attr]', default: ''},
          {name: 'border', type: 'Boolen [attr]', default: ''},
          {name: 'color', type: 'String', default: '$color-green'}
        ],
        apiEmits: ['remove']
      },
      apiDropdown: {
        apiProps: [
          {name: 'modelValue', type: 'String', default: 'null'},
          {name: 'title', type: 'String', default: 'none'},
          {name: 'options', type: 'Array', default: 'none'},
          {name: 'scrollHeight', type: 'String', default: '200px'},
          {name: 'openPosition', type: 'String', default: 'left'},
          {name: 'optionLabel', type: 'String', default: 'null'},
          {name: 'optionValue', type: 'String', default: 'null'},
          {name: 'search', type: 'Boolen [attr]', default: ''},
          {name: 'searchPlaceholder', type: 'String', default: ''},
          {name: 'emptyMessage', type: 'String', default: 'No available options'},
          {name: 'emptySearchMessage', type: 'String', default: 'No results found'},
          {name: 'async', type: 'Boolen', default: 'false'},
          {name: 'disabled', type: 'Boolen', default: 'false'},
          {name: 'tabindex', type: 'String', default: ''},
          {name: 'appendTo', type: 'String', default: 'body'},
          {name: 'inputId', type: 'String', default: ''},
          {name: 'dataKey', type: 'String', default: 'null'},
          {name: 'loadingIcon', type: 'String', default: 'y-dropdown-loading-icon i-loading y-spin'},
          {name: 'panelClass', type: 'String', default: ''},
          {name: 'error', type: 'Boolen', default: 'false'},
          {name: 'errorMessage', type: 'String', default: ''},
          {name: 'filter', type: 'Boolen [attr]', default: ''},
          {name: 'filterPlaceholder', type: 'String', default: ''}
        ],
        apiEmits: ['update: modelValue', 'before-show', 'before-hide', 'show', 'hide', 'change', 'filter', 'search', 'focus', 'blur', 'asyncSearch']
      },
      apiMenu: {
        apiProps: [
          {name: 'appendTarget', type: 'String', default: 'body'},
          {name: 'list', type: 'Array', default: 'null'},
          {name: 'baseZIndex', type: 'String', default: '0'},
          {name: 'exact', type: 'Boolen', default: 'true'},
          {name: 'position', type: 'String', default: 'right'}
        ],
        apiEmits: ['show', 'hide']
      },
      apiFilters: {
        apiProps: [{name: 'options', type: 'Array', default: ''}],
        apiEmits: ['update: modelValue', 'before-show', 'before-hide', 'show', 'hide', 'change', 'filter', 'search', 'focus', 'blur']
      }
    }
  },
  created() {
    //  check if the API exists
    this.canCopy = !!navigator.clipboard
    this.isLoading2 = true
  },
  mounted() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        })
      })
    })
  },
  methods: {
    ...mapActions({
      searchCustomers: 'company/customers/search'
    }),
    toggle() {
      this.isLoading = true
    },
    async copy(text) {
      // API async
      await navigator.clipboard.writeText(text)
    },
    select(e) {
      this.chosen = e.value
    },
    async search({query}) {
      const customers = await this.searchCustomers({search: query})
      this.customers = customers.data.data.map(c => {
        c.name = `${c.firstName} ${c.lastName}`
        return c
      })
    },
    setPhone(e) {
      console.log(e)
      this.newPhone = '+380'
      // console.log(this.newPhone)
    }
  }
}
</script>
<style lang="scss">
@import 'style';
.y-dropdown-panel.colored {
  min-width: 200px !important;
  background-color: lightyellow;
}
.your_icon_class i {
  color: orange;
}
// .colored {
//   background-color: lightyellow !important;
// }
</style>
