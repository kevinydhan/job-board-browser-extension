const getJob = async (boardToken, jobId) => {
  const apiUrl = 'https://boards-api.greenhouse.io/v1'
  const url = `${apiUrl}/boards/${boardToken}/jobs/${jobId}`
  const response = await fetch(url)
  return response.json()
}

const getBoardTokenAndJobId = () => {
  const [
    _space,
    boardToken,
    _staticPath,
    jobId,
  ] = window.location.pathname.split('/')
  return { boardToken, jobId }
}

const createUpdatedAtDate = (innerText) => {
  const header = document.getElementById('header')
  const lastUpdatedDate = document.createElement('p')
  lastUpdatedDate.innerText = innerText
  lastUpdatedDate.classList.add('last-updated-date')
  header.appendChild(lastUpdatedDate)
}

const createCopyJobIdButton = (jobId) => {
  const doesClipboardExist = 'navigator' in window && 'clipboard' in navigator
  if (!doesClipboardExist) return

  const header = document.getElementById('header')
  const button = document.createElement('button')

  button.classList.add('button')
  button.innerText = 'Copy Greenhouse Job ID'
  button.style.border = 'none'
  button.style.cursor = 'pointer'
  button.addEventListener('click', () => navigator.clipboard.writeText(jobId))

  header.appendChild(button)
}

const getSemanticDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

const main = async () => {
  const { boardToken, jobId } = getBoardTokenAndJobId()
  const job = await getJob(boardToken, jobId)
  const date = getSemanticDate(job.updated_at)
  createUpdatedAtDate(`Updated at ${date}`)
  createCopyJobIdButton(jobId)
}

main()
