import gql from 'graphql-tag';

export default async function ensureCourse({ args, context, create }) {
  // find
  let filter;
  let fArgs;
  let variables;
  if (args.id) {
    fArgs = '$id: ID';
    filter = 'id: $id';
    variables = {
      id: args.id,
    };
  }
  let course;
  if (filter) {
    course = await context
      .userGQL({
        query: gql`query findCourse(${fArgs}){
            course(${filter}){
              id
            }
          }
          `,
        variables,
      })
      .then(r => r.data.course);
  }

  if (!course) {
    if (create) {
      course = await context
        .userGQL({
          query: gql`
            mutation createCourse($course: createCourseInput!) {
              createCourse(input: $course) {
                course {
                  node {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            course: {
              createdBy: args.createdBy,
              updateBy: args.updateBy,
              createdAt: args.createdAt,
              updatedAt: args.updatedAt,
              removed: args.removed,
              owner: args.owner,
            },
          },
        })
        .then(r => r.data.createCourse.course.node);
    }
  } else {
    // update
    course = await context
      .userGQL({
        query: gql`
          mutation updateCourse($course: updateCourseInput!) {
            updateCourse(input: $course) {
              course {
                id
              }
            }
          }
        `,
        variables: {
          course: {
            createdBy: args.createdBy,
            updateBy: args.updateBy,
            createdAt: args.createdAt,
            updatedAt: args.updatedAt,
            removed: args.removed,
            owner: args.owner,
          },
        },
      })
      .then(r => r.data.updateCourse.course);
  }
  return course;
}
