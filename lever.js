const getJob = async (boardToken, jobId) => {
  const apiUrl = 'https://api.lever.co/v0'
  const url = `${apiUrl}/postings/${boardToken}/${jobId}`
  const response = await fetch(url)
  return response.json()
}

const getBoardTokenAndJobId = () => {
  const [_space, boardToken, jobId] = window.location.pathname.split('/')
  return { boardToken, jobId }
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

const createCreatedAtDate = (innerText) => {
  const header = document.querySelector('.posting-header')
  const createdAtDate = document.createElement('p')
  createdAtDate.innerText = innerText
  header.appendChild(createdAtDate)
}

const createCopyJobIdButton = (jobId) => {
  const doesClipboardExist = 'navigator' in window && 'clipboard' in navigator
  if (!doesClipboardExist) return

  const header = document.querySelector('.posting-header')
  const button = document.createElement('button')

  button.classList.add('template-btn-submit')
  button.innerText = 'Copy Lever Job ID'
  button.addEventListener('click', () => navigator.clipboard.writeText(jobId))

  header.appendChild(button)
}

const main = async () => {
  const { boardToken, jobId } = getBoardTokenAndJobId()
  if (!boardToken || !jobId) return
  const job = await getJob(boardToken, jobId)
  const date = getSemanticDate(job.createdAt)
  createCreatedAtDate(`Created at ${date}`)
  createCopyJobIdButton(jobId)
}

main()
