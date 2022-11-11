// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}

/*
export default function myPageHandler(req, res){
  const {
    query: {id, name},
    method,
  } = req
  switch(method){
    case 'GET':
    // !get data from database
      res.status(200).json({id, name: `User ${id}`})
      break
      case 'PUT':
        res.status(200).json({id, name: name || `User ${id}`})
        break
        default:
          res.setHeader("Allow", ['GET', 'PUT'])
          res.status(405).end(`Method ${method} Not Allowed`)
  }
}
 */
