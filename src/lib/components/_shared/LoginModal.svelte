<script lang="ts">
  import { ShowLoginModal } from '$components/_shared/Stores';
</script>

<div class="fixed inset-0 backdrop-blur" on:click="{() => ($ShowLoginModal = false)}">
  <div class="flex h-full items-center justify-center">
    <div class="rounded-xl border border-neutral-400 bg-white px-8 py-4" on:click|stopPropagation>
      <div class="flex flex-col gap-4">
        <div class=" text-xl font-semibold">Sign In</div>

        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-1">
            <span>Email</span>
            <input type="text" />
          </div>
          <div class="flex flex-col gap-1">
            <span>Password</span>
            <input type="password" />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <div class="rounded bg-main-400 py-2 text-center">Sign In</div>
          <div class="text-right text-xs text-neutral-500">
            Don't have an account yet? <a
              href="/register"
              class="text-blue-500 hover:underline"
              on:click="{() => ($ShowLoginModal = false)}"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  input {
    @apply w-[300px] border border-neutral-300;
  }
</style>
