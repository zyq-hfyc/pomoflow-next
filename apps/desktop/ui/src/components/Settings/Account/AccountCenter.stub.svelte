<!-- AccountPage 测试替身:渲染 section prop 以便断言父级类型收窄(centerSection)。 -->
<script lang="ts">
  let { section }: { section: string } = $props();
</script>

<div data-stub="account-center">CENTER:{section}</div>
